import { Order, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const orderRepository = prisma.order;
const productRepository = prisma.product;

export const orderCreateHandler = async (data: Order) => {
  try {
    const result = await orderRepository.create({
      data: {
        id: data.id,
        productId: data.productId,
        orderQuantity: data.orderQuantity,
        status: data.status,
      },
    });
    console.log(`Successfully created order ${result.id}`);

    const product = await productRepository.findFirst({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }

    if (product.quantity < data.orderQuantity) {
      throw new Error(
        `Order quantity ${data.orderQuantity} exceeds product quantity ${data.orderQuantity}`
      );
    }

    const newProductQuantity = product.quantity - data.orderQuantity;

    const res = await productRepository.update({
      where: { id: data.productId },
      data: {
        quantity: newProductQuantity,
      },
    });

    console.log(`Successfully updated product ${res.id}`);
  } catch (error) {
    console.log(`Failed to create order`);
  }
};

export const orderCancelHandler = async (data: Order) => {
  try {
    const order = await orderRepository.findFirst({ where: { id: data.id } });
    if (!order) {
      throw new Error(`Order ${data.id} not found`);
    }

    const cancelledOrder = await orderRepository.update({
      where: { id: data.id },
      data: {
        status: "cancelled",
      },
    });

    console.log(`Successfully canceled order ${cancelledOrder.id}`);

    const product = await productRepository.findFirst({
      where: { id: data.productId },
    });
    if (!product) {
      throw new Error(`Product ${data.productId} not found`);
    }

    const newProductQuantity = product.quantity + order.orderQuantity;
    const updatedProduct = await productRepository.update({
      where: { id: product.id },
      data: {
        quantity: newProductQuantity,
      },
    });

    console.log(`Successfully updated product ${updatedProduct.id} quantity`);
  } catch (error) {
    console.log(`Failed to create order`);
  }
};
