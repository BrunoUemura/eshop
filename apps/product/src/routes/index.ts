import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";

const router = Router();

router.get("/api/products", getAllProducts);
router.get("/api/products/:id", getProductById);

router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

export { router };
