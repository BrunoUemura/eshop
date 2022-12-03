import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import KafkaProducer from "../shared/kafka-producer";

const prisma = new PrismaClient();
const orderRepository = prisma.order;
const kafkaProducer = new KafkaProducer();

export const getAllOrders = async (
  _request: Request,
  response: Response
): Promise<Response> => {
  const result = await orderRepository.findMany();
  return response.send(result);
};

export const getOrderById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const result = await orderRepository.findFirst({
    where: { id: Number(id) },
  });
  return response.send(result);
};

export const createOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { productId, orderQuantity } = request.body;
  const result = await orderRepository.create({
    data: {
      productId: Number(productId),
      orderQuantity: Number(orderQuantity),
      status: "awaiting payment",
    },
  });

  const message = {
    topic: "order",
    payload: {
      eventType: "order/create",
      data: result,
    },
  };

  await kafkaProducer.sendMessage(message);

  return response.status(201).send(result);
};

export const updateOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const { productId, orderQuantity, status } = request.body;
  const result = await orderRepository.update({
    where: { id: Number(id) },
    data: { productId, orderQuantity, status },
  });
  return response.send(result);
};

export const cancelOrder = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const result = await orderRepository.update({
    where: { id: Number(id) },
    data: {
      status: "canceled",
    },
  });

  const message = {
    topic: "order",
    payload: {
      eventType: "order/cancel",
      data: result,
    },
  };

  await kafkaProducer.sendMessage(message);

  return response.send(result);
};
