import { PrismaClient } from "@prisma/client";
import KafkaProducer from "../../shared/kafka-producer";

const kafkaProducer = new KafkaProducer();
const prisma = new PrismaClient();
const orderRepository = prisma.order;

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
    const result = await orderRepository.update({
      where: {
        id: order.id,
      },
      data: {
        status: "payment done",
      },
    });
    console.log(
      `Successfully updated order ${order.id} status to ${result.status}`
    );

    const message = {
      topic: "order",
      payload: {
        eventType: "order/update",
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
    const result = await orderRepository.update({
      where: {
        id: order.id,
      },
      data: {
        status: "canceled",
      },
    });
    console.log(
      `Successfully updated order ${order.id} status to ${result.status}`
    );

    const message = {
      topic: "order",
      payload: {
        eventType: "order/cancel",
        data: result,
      },
    };

    await kafkaProducer.sendMessage(message);
  } catch (error) {
    console.log(error);
  }
};
