import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const create = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Vui lòng điền thông tin!" });
      return;
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ message: "Danh mục đã tồn tại!" });
      return;
    }

    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: `Đã tạo thư mục ${name} thành công`, category });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi tạo danh mục!" });
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Không tìm thấy danh mục!" });
      return;
    }
    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    res.status(200).json({
      message: `Đã cập nhật ${category.name} thành công!`,
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật danh mục!" });
  }
});

const deleteById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Không tìm thấy danh mục!" });
      return;
    }
    await Category.deleteOne({ _id: category._id });
    res
      .status(200)
      .json({ message: `Danh mục ${category.name} đã được xóa!`, category });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi xóa danh mục!" });
  }
});

const allCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi hiển thị các danh mục!" });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Danh mục không tồn tại!" });
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị danh mục!" });
  }
});

export { create, update, deleteById, allCategories, readCategory };
