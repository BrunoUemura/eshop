import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "iPhone 14",
    price: 799.99,
    quantity: 332,
    category: "electronics",
    image_url: "https://m.media-amazon.com/images/I/61cwywLZR-L._AC_SX522_.jpg",
  },
  {
    name: "iPhone 14 Pro",
    price: 999.99,
    quantity: 87,
    category: "electronics",
    image_url: "https://m.media-amazon.com/images/I/518bzP8VW1L._AC_SX522_.jpg",
  },
  {
    name: "iPhone 14 Pro Max",
    price: 1199.99,
    quantity: 250,
    category: "electronics",
    image_url:
      "https://www.apple.com/v/iphone-14-pro/b/images/overview/hero/hero_endframe__cvklg0xk3w6e_large.jpg",
  },
  {
    name: "PlayStation 5",
    price: 399.99,
    quantity: 452,
    category: "video games",
    image_url: "https://m.media-amazon.com/images/I/51VZErxKwkL._AC_SX522_.jpg",
  },
  {
    name: "Xbox Series X",
    price: 499.99,
    quantity: 874,
    category: "video games",
    image_url:
      "https://http2.mlstatic.com/D_NQ_NP_794435-MLA45046407331_032021-O.jpg",
  },
  {
    name: "New Balance 574",
    price: 99.99,
    quantity: 544,
    category: "fashion",
    image_url: "https://cf.shopee.com.br/file/401df56a11f37357e5e692d886ec56e3",
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
