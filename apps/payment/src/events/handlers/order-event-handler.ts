import { Order, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const orderRepository = prisma.order;
const productRepository = prisma.product;

export const orderCreateHandler = async (data: Order) => {
  try {
    // Add order
    const order = await orderRepository.create({
      data: {
        id: Number(data.id),
        productId: Number(data.productId),
        orderQuantity: Number(data.orderQuantity),
        amount: Number(data.amount),
        status: String(data.status),
      },
    });
    console.log(`Successfully added order ${order.id}`);

    // Check if product exists and quantity is available
    const product = await productRepository.findFirst({
      where: { id: Number(data.productId) },
    });
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }
    if (product.quantity < data.orderQuantity) {
      throw new Error(
        `Order quantity ${data.orderQuantity} exceeds product quantity ${data.orderQuantity}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const orderUpdateHandler = async (data: Order) => {
  try {
    // Check if order exists
    const order = await orderRepository.findFirst({ where: { id: data.id } });
    if (!order) {
      throw new Error(`Order ${data.id} not found`);
    }

    // Update existing order
    const result = await orderRepository.update({
      where: { id: data.id },
      data: {
        orderQuantity: Number(data.orderQuantity),
        amount: Number(data.amount),
        productId: Number(data.productId),
        status: String(data.status),
      },
    });

    console.log(`Successfully updated order ${result.id}`);
  } catch (error) {
    console.log(error);
  }
};

export const orderCancelHandler = async (data: Order) => {
  try {
    // Check if order exists
    const order = await orderRepository.findFirst({ where: { id: data.id } });
    if (!order) {
      throw new Error(`Order ${data.id} not found`);
    }

    // Cancel existing order
    const cancelledOrder = await orderRepository.update({
      where: { id: data.id },
      data: {
        status: "order canceled",
      },
    });

    console.log(`Successfully canceled order ${cancelledOrder.id}`);
  } catch (error) {
    console.log(error);
  }
};
