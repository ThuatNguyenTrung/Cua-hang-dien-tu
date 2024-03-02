import express from "express";

import {
  create,
  login,
  logoutUser,
  profile,
  update,
  deleteById,
  updateById,
  profileById,
  getAllUsers,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/create").post(create);
router.route("/login").post(login);
router.route("/").post(logoutUser);
router.route("/all").get(authenticate, authorizeAdmin, getAllUsers);
router.route("/profile").get(authenticate, profile);
router.route("/update").put(authenticate, update);
router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteById);
router.route("/profile/:id").get(authenticate, authorizeAdmin, profileById);
router.route("/update/:id").put(authenticate, authorizeAdmin, updateById);

export default router;
