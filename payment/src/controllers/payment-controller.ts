import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import KafkaProducer from "../shared/kafka-producer";

const kafkaProducer = new KafkaProducer();
const prisma = new PrismaClient();
const productRepository = prisma.product;
const orderRepository = prisma.order;
const paymentRepository = prisma.payment;

export const getPaymentById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const result = await paymentRepository.findFirst({
    where: { id: Number(id) },
  });
  return response.send(result);
};

export const createPayment = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { orderId, amount } = request.body;

  // Check if order exists and status is "awaiting payment"
  const order = await orderRepository.findFirst({ where: { id: orderId } });
  if (!order) {
    return response.status(400).send({
      message: `Order ${orderId} not found`,
    });
  }
  if (order.status !== "awaiting payment") {
    return response.status(400).send({
      message: `Order ${orderId} status is not awaiting payment`,
    });
  }

  // Check if product exists and quantity is available
  const product = await productRepository.findFirst({
    where: { id: order.productId },
  });
  if (!product) {
    return response.status(400).send({
      message: `Product ${order.productId} not found`,
    });
  }
  if (product.quantity < order.orderQuantity) {
    return response.status(400).send({
      message: `Order quantity ${order.orderQuantity} exceeds available product quantity ${product.quantity}`,
    });
  }

  // Perform payment
  const result = await paymentRepository.create({
    data: {
      orderId: order.id,
      productId: order.productId,
      amount: amount,
      status: "done",
    },
  });

  const message = {
    topic: "payment",
    payload: {
      eventType: "payment/done",
      data: result,
    },
  };

  await kafkaProducer.sendMessage(message);

  return response.status(201).send({
    message: `Successfully paid order ${order.id}`,
    data: result,
  });
};

export const cancelPayment = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  // Check if payment exists
  const paymentExists = await paymentRepository.findFirst({
    where: { id: Number(id) },
  });
  if (!paymentExists) {
    return response.status(400).send({
      message: `Payment ${id} not found`,
    });
  }

  // Perform payment cancel
  const payment = await paymentRepository.update({
    where: { id: Number(id) },
    data: {
      status: "canceled",
    },
  });

  return response.status(201).send({
    message: `Successfully canceled payment ${payment.id}`,
    data: payment,
  });
};
