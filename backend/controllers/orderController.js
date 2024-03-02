import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const calcPrice = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 1000000 ? 0 : 50000;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice =
    (Math.ceil(itemsPrice + shippingPrice + taxPrice) / 1000) * 1000;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (
      !orderItems ||
      !orderItems.length ||
      !shippingAddress ||
      !paymentMethod
    ) {
      res.status(400).json({ message: "Vui lòng thêm thông tin đơn hàng!" });
      return;
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((item) => item._id) },
    });

    const items = orderItems.map((item) => {
      const dbItem = itemsFromDB.find((dbItem) => dbItem._id.equals(item._id));
      if (!dbItem) {
        res.status(404).json({ message: "Không tìm thấy sản phẩm!" });
        return;
      }

      return {
        ...item,
        product: dbItem._id,
        price: dbItem.price,
        _id: undefined,
      };
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calcPrice(items);

    const order = new Order({
      user: req.user._id,
      orderItems: items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ message: "Đã thêm đơn hàng", order: createdOrder });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi thêm đơn hàng!" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị đơn hàng!" });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiện thị đơn hàng!" });
  }
});

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi hiện thị số đơn hàng!" });
  }
});

const countTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiện thị doanh thu!" });
  }
});

const countTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const totalSalesBydate = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $match: {
          isPaid: true,
        },
      },
    ]);
    res.json(totalSalesBydate);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiện thị doanh thu!" });
  }
});

const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!order) {
      res.status(404).json({ message: "Không tìm thâý đơn hàng!" });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi khi hiện thị đơn hàng!" });
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Không tìm thâý đơn hàng!" });
      return;
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.json({ message: "Đơn hàng đã thanh toán thành công!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "Không tìm thâý đơn hàng!" });
      return;
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json({ message: "Đơn hàng đã giao thành công!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
});

const markOrderAsPaidByAdmin = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      req.status(404).json({ message: "Không tìm thâý đơn hàng!" });
      return;
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json({ message: "Đơn hàng đã thanh toán thành công!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi!" });
  }
});

export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  countTotalSales,
  countTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  markOrderAsPaidByAdmin,
};
