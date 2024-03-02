import User from "../models/userModel.js";
import asyncHandler from "./../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const create = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Vui lòng điền vào thông tin!" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "Tài khoản đã tồn tại!" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    createToken(res, user._id);
    res.status(201).json({
      message: `Đã tạo tài khoản ${username} thành công!`,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Không thể tạo tài khoản. Vui lòng thử lại sau!" });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Vui lòng điền vào thông tin!" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: "Tài khoản không tồn tại!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Mật khẩu không đúng!" });
      return;
    }

    createToken(res, existingUser._id);
    res.status(200).json({
      message: `Đã đăng nhập tài khoản ${existingUser.username} thành công`,
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập!" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi Đăng xuất!" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).json({ message: "Không tìm thấy người dùng!" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị người dùng!" });
  }
});

const profile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy tài khoản!" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng!" });
  }
});

const update = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy tài khoản!" });
      return;
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: `Đã cập nhật tài khoản ${updatedUser.username} thành công!`,
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng!" });
  }
});

const deleteById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy tài khoản!" });
      return;
    }

    if (user.isAdmin) {
      res.status(400).json({ message: "Không thể xóa tài khoản Admin!" });
      return;
    }

    res
      .status(200)
      .json({ message: `Tài khoản ${user.username} đã được xóa!`, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xóa tài khoản. Vui lòng thử lại!" });
  }
});

const profileById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy tài khoản !" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng!" });
  }
});

const updateById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy tài khoản!" });
      return;
    }

    if (user.isAdmin) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
    } else {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: `Đã cập nhật tài khoản ${updatedUser.username} thành công!`,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng!" });
  }
});

export {
  create,
  login,
  logoutUser,
  getAllUsers,
  profile,
  update,
  deleteById,
  profileById,
  updateById,
};
