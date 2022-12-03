import { PrismaClient } from "@prisma/client";
import KafkaProducer from "../../shared/kafka-producer";

const kafkaProducer = new KafkaProducer();
const prisma = new PrismaClient();
const orderRepository = prisma.order;
const productRepository = prisma.product;

export const paymentDoneHandler = async (data: any) => {
  try {
    // Check if order exists
    const order = await orderRepository.findFirst({
      where: { id: data.orderId },
    });
    if (!order) {
      throw new Error(`Order ${data.orderId} not found`);
    }

    // Change order status
    const orderUpdate = await orderRepository.update({
      where: {
        id: order.id,
      },
      data: {
        status: "payment done",
      },
    });
    console.log(
      `Successfully updated order ${order.id} status to ${orderUpdate.status}`
    );

    // Check if product exists and quantity is available
    const product = await productRepository.findFirst({
      where: { id: data.productId },
    });
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }
    if (product.quantity < order.orderQuantity) {
      throw new Error(
        `Order quantity ${order.orderQuantity} exceeds product quantity ${product.quantity}`
      );
    }

    const newProductQuantity = product.quantity - order.orderQuantity;
    const result = await productRepository.update({
      where: { id: product.id },
      data: {
        quantity: newProductQuantity,
      },
    });
    console.log(
      `Successfully updated product ${product.id} quantity to ${result.quantity}`
    );

    const message = {
      topic: "product",
      payload: {
        eventType: "product/update",
        data: result,
      },
    };

    await kafkaProducer.sendMessage(message);
  } catch (error) {
    console.log(error);
  }
};

export const paymentCancelHandler = async (data: any) => {
  try {
    // Check if order exists
    const order = await orderRepository.findFirst({
      where: { id: data.orderId },
    });
    if (!order) {
      throw new Error(`Order ${data.orderId} not found`);
    }
    // Change order status
    const orderUpdate = await orderRepository.update({
      where: {
        id: order.id,
      },
      data: {
        status: "canceled",
      },
    });
    console.log(
      `Successfully updated order ${order.id} status to ${orderUpdate.status}`
    );

    // Check if product exists
    const product = await productRepository.findFirst({
      where: { id: data.productId },
    });
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }

    const newProductQuantity = product.quantity + order.orderQuantity;
    const result = await productRepository.update({
      where: { id: product.id },
      data: {
        quantity: newProductQuantity,
      },
    });
    console.log(
      `Successfully updated product ${product.id} quantity to ${result.quantity}`
    );

    const message = {
      topic: "product",
      payload: {
        eventType: "product/update",
        data: result,
      },
    };

    await kafkaProducer.sendMessage(message);
  } catch (error) {
    console.log(error);
  }
};
