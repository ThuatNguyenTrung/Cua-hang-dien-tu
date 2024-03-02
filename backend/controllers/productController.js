import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, image, brand, quantity, category, description, price } =
      req.body;
    if (
      !name ||
      !image ||
      !brand ||
      !quantity ||
      !category ||
      !description ||
      !price
    ) {
      res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
      return;
    }
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      res.status(400).json({ message: `Sản phẩm ${name} đã tồn tại!` });
      return;
    }

    const product = new Product({ ...req.body });
    await product.save();
    res
      .status(201)
      .json({ message: `Đã thêm sản phẩm ${name} thành công!`, product });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi thêm sản phẩm!" });
  }
});

const updatelan2Product = asyncHandler(async (req, res) => {
  try {
    const { name, image, brand, quantity, category, description, price } =
      req.body;
    if (
      !name ||
      !image ||
      !brand ||
      !quantity ||
      !category ||
      !description ||
      !price
    ) {
      res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
      return;
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
      return;
    }

    product.name = name;
    product.image = image;
    product.brand = brand;
    product.quantity = quantity;
    product.category = category;
    product.description = description;
    product.price = price;

    const updatedProduct = await product.save();
    res.json({ message: "Sản phẩm đã được cập nhật!", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật sản phẩm!" });
  }
});

const deleteById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
      return;
    }
    res
      .status(200)
      .json({ message: `Sản phẩm ${product.name} đã được xóa!`, product });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi xóa sản phẩm!" });
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $option: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const totalPages = Math.ceil(count / pageSize);
    const hasMore = page < totalPages;

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, totalPages, hasMore });
    if (!products) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị sản phẩm!" });
  }
});

const detail = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị sản phẩm!" });
  }
});

const findProductByName = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm !" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi hiện thị sản phẩm này!" });
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị sản phẩm!" });
  }
});

const createReviewByname = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      res.status(400).json({ message: "Vui lòng điền đầy đủ các thông tin!" });
      return;
    }
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
      res.status(404).json({ message: "Sản phẩm không tồn tại!" });
      return;
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400).json({ message: "Sản phẩm đã được đánh giá rồi!" });
      return;
    }
    const newReview = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    if (product.reviews.length > 0) {
      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length;
    }
    await product.save();
    res.json({
      message: `Đánh giá sản phẩm ${product.name} thành công!`,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đánh giá này!" });
  }
});

const top = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ rating: -1 }).limit(6);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi hiển thị sản phẩm nổi bật!" });
  }
});

const getRandomProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.aggregate().limit(6);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi tìm những sản phẩm!" });
  }
});

const getRelativeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
      return;
    }
    const products = await Product.find({ category: product.category }).limit(
      6
    );
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi tìm những san pham!" });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, priceRange } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }

    if (priceRange) {
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1];

      if (maxPrice === "greater") {
        args.price = { $gte: minPrice };
      } else {
        args.price = { $gte: minPrice, $lte: maxPrice };
      }
    }

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi tìm những san pham!" });
  }
});

export {
  deleteById,
  fetchProducts,
  detail,
  fetchAllProducts,
  top,
  getRandomProducts,
  createProduct,
  updatelan2Product,
  findProductByName,
  createReviewByname,
  getRelativeProduct,
  filterProducts,
};
