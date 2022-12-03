import { Router } from "express";
import {
  createPayment,
  cancelPayment,
  getPaymentById,
} from "../controllers/payment-controller";

const router = Router();

router.get("/api/payment/:id", getPaymentById);
router.post("/api/payment", createPayment);
router.delete("/api/payment/:id", cancelPayment);

export { router };
