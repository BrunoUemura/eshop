import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();
const productRepository = prisma.product;

export const productUpdateHandler = async (data: Product) => {
  try {
    // Check if product exists
    const product = await productRepository.findFirst({
      where: { id: data.id },
    });
    if (!product) {
      throw new Error(`Product ${data.id} not found`);
    }

    // Update product
    const result = await productRepository.update({
      where: { id: product.id },
      data: {
        name: data.name,
        quantity: data.quantity,
      },
    });
    console.log(`Successfully updated product ${result.id}`);
  } catch (error) {
    console.log(error);
  }
};
