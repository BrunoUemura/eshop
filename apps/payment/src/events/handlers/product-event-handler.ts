import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();
const productRepository = prisma.product;

export const productUpdateHandler = async (data: Product) => {
  try {
    // Check if product exists
    const product = await productRepository.findFirst({
      where: { id: Number(data.id) },
    });
    if (!product) {
      throw new Error(`Product ${data.id} not found`);
    }

    // Update product
    const result = await productRepository.update({
      where: { id: product.id },
      data: {
        name: String(data.name),
        quantity: Number(data.quantity),
      },
    });
    console.log(`Successfully updated product ${result.id}`);
  } catch (error) {
    console.log(error);
  }
};
