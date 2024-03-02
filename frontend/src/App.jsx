import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Profile from "./pages/User/Profile";
import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import UpdateUsers from "./pages/Admin/UpdateUsers";
import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Favorites from "./pages/Product/Favorites";

import ProductDetail from "./pages/Product/ProductDetail";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Shipping from "./pages/Orders/Shipping";
import Payment from "./pages/Orders/Payment";
import PayOrder from "./pages/Orders/PayOrder";
import UserOrder from "./pages/User/UserOrder";
import OrderList from "./pages/Admin/OrderList";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/products/:name" element={<ProductDetail />} />
            <Route path="/carts" element={<Cart />} />
            <Route path="/products" element={<Shop />} />

            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order/:id" element={<PayOrder />} />
              <Route path="/user-orders" element={<UserOrder />} />
            </Route>

            <Route path="/admin" element={<AdminRoute />}>
              <Route path="/admin/userlist" element={<UserList />} />
              <Route path="/admin/update/user/:id" element={<UpdateUsers />} />
              <Route path="/admin/categorylist" element={<CategoryList />} />
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route path="/admin/allproductlist" element={<AllProducts />} />
              <Route
                path="/admin/update/product/:id"
                element={<UpdateProduct />}
              />
            </Route>
            <Route path="/admin/orderlist" element={<OrderList />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
