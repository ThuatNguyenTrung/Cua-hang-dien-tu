import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const updateCart = (cart) => {
  const itemPrices = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemPrices > 300000 ? 0 : 50000;
  const taxPrice = Math.round((itemPrices * 0.1) / 100) * 100;
  const totalPrice = itemPrices + shippingPrice + taxPrice;

  const updatedCart = {
    ...cart, // Thay đổi từ ...state thành ...cart
    itemPrices,
    shippingPrice,
    taxPrice,
    totalPrice,
  };

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  return updatedCart;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingIndex !== -1) {
        // Nếu phần tử đã tồn tại trong giỏ hàng, cập nhật lại phần tử đó
        state.cartItems[existingIndex] = newItem;
      } else {
        // Nếu phần tử chưa tồn tại, thêm mới vào giỏ hàng
        state.cartItems.push(newItem);
      }
      updateCart(state);
    },

    removeFromCart: (state, action) => {
      // Sử dụng _id thay vì id
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
