import express from "express";
import formidable from "express-formidable";

import {
  deleteById,
  fetchProducts,
  fetchAllProducts,
  detail,
  top,
  getRandomProducts,
  createProduct,
  updatelan2Product,
  findProductByName,
  createReviewByname,
  getRelativeProduct,
  filterProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "./../middlewares/checkId.js";

const router = express.Router();

router.route("/delete/:id").delete(authenticate, authorizeAdmin, deleteById);
router.route("/").get(fetchProducts);
router.route("/detail/:id").get(detail);
router.route("/all").get(fetchAllProducts);

router.route("/top").get(top);

router.route("/random").get(getRandomProducts);
router
  .route("/createproduct")
  .post(authenticate, authorizeAdmin, createProduct);
router
  .route("/updateproduct/:id")
  .put(authenticate, authorizeAdmin, updatelan2Product);
router.route("/product/:name").get(findProductByName);
router.route("/product/:name/reviews").post(authenticate, createReviewByname);
router.route("/product/:name/category").get(getRelativeProduct);
router.route("/filter").post(filterProducts);

export default router;
