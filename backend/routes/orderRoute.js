import express from "express";

import {
  countTotalOrders,
  countTotalSales,
  countTotalSalesByDate,
  createOrder,
  findOrderById,
  getAllOrders,
  getUserOrders,
  markOrderAsPaid,
  markOrderAsDelivered,
  markOrderAsPaidByAdmin,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, createOrder);
router.route("/all").get(authenticate, authorizeAdmin, getAllOrders);
router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(countTotalSales);
router.route("/total-sales-by-date").get(countTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeAdmin, markOrderAsDelivered);
router
  .route("/:id/paid")
  .put(authenticate, authorizeAdmin, markOrderAsPaidByAdmin);
export default router;
