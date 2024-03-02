import express from "express";

import {
  allCategories,
  create,
  deleteById,
  readCategory,
  update,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(authenticate, authorizeAdmin, create);
router.route("/update/:id").put(authenticate, authorizeAdmin, update);
router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteById);
router.route("/categories").get(allCategories);
router.route("/:id").get(readCategory);

export default router;
