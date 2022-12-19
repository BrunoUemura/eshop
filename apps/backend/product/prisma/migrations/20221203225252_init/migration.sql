-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_quantity" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
