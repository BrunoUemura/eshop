import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "iPhone 14",
    quantity: 332,
  },
  {
    name: "iPhone 14 Pro",
    quantity: 87,
  },
  {
    name: "iPhone 14 Pro Max",
    quantity: 250,
  },
  {
    name: "PlayStation 5",
    quantity: 452,
  },
  {
    name: "Xbox Series X",
    quantity: 874,
  },
  {
    name: "New Balance 574",
    quantity: 544,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
