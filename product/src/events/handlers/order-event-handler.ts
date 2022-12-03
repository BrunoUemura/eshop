import { Order, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const orderRepository = prisma.order;
const productRepository = prisma.product;
const reservedProductRepository = prisma.reservedProduct;

export const orderCreateHandler = async (data: Order) => {
  try {
    // Add order
    const order = await orderRepository.create({
      data: {
        id: data.id,
        productId: data.productId,
        orderQuantity: data.orderQuantity,
        status: data.status,
      },
    });
    console.log(`Successfully added order ${order.id}`);

    // Check if product exists and quantity is available
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

    // Create product reservation
    const reservedProduct = await reservedProductRepository.create({
      data: {
        orderId: data.id,
        productId: data.productId,
        quantity: data.orderQuantity,
        status: data.status,
      },
    });

    console.log(
      `Successfully created product reservation ${reservedProduct.id} for product ${product.id}`
    );
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
        status: "canceled",
      },
    });

    console.log(`Successfully canceled order ${cancelledOrder.id}`);

    // Check if reservation exists
    const reservation = await reservedProductRepository.findFirst({
      where: { orderId: data.id },
    });
    if (!reservation) {
      throw new Error(`Reservation for order ${data.id} not found`);
    }

    // Cancel reservation
    const updatedProduct = await reservedProductRepository.update({
      where: { id: reservation.id },
      data: {
        status: "canceled",
      },
    });

    console.log(`Successfully canceled reservation ${updatedProduct.id}`);
  } catch (error) {
    console.log(error);
  }
};
