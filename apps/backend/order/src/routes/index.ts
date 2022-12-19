import { Router } from "express";
import {
  createOrder,
  cancelOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order-controller";

const router = Router();

router.get("/api/orders", getAllOrders);
router.get("/api/orders/:id", getOrderById);

router.post("/api/orders", createOrder);
router.post("/api/orders/:id", cancelOrder);
router.put("/api/orders/:id", updateOrder);

export { router };
