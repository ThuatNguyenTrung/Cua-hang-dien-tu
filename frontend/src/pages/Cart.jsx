import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import formatPriceToVND from "./../Utils/fomatPrice";
import { addToCart, removeFromCart } from "../redux/features/cartSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <>
      <div className="py-10 ">
        <div className="container bg-secondary/20 p-10 rounded-md text-center space-y-5 my-10 min-h-screen">
          {cart?.cartItems?.length === 0 ? (
            <div>
              Giỏ hàng của bạn trống{" "}
              <Link to="/products" className="text-primary font-bold">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div>
              <div className="space-y-5">
                <div
                  data-aos="zoom-animate"
                  className="text-3xl font-bold text-primary"
                >
                  Giỏ hàng
                </div>
                {cart?.cartItems?.map((item) => (
                  <div
                    data-aos="zoom-in"
                    key={item._id}
                    className="bg-white p-5 rounded-xl  flex flex-wrap items-center justify-between gap-5 mb-5"
                  >
                    <div className="flex items-center gap-4 ">
                      <div className="overflow-hidden">
                        <img
                          src={item.image}
                          alt="item.image"
                          className="w-[150px] h-[150px] rounded-lg hover:scale-110 duration-200 transition-all"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-5">
                        <Link
                          to={`/products/${item.name}`}
                          onClick={() => window.scrollTo(0, 0)}
                          className="font-bold hover:text-primary duration-200 transition-all"
                        >
                          {" "}
                          {item.name}
                        </Link>
                        <div>{item.brand}</div>
                        <div className="font-bold text-2xl">
                          {formatPriceToVND(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 mx-10 ml-0">
                      <select
                        name="quantity"
                        id="quantity"
                        value={item.quantity}
                        className=" border border-gray-400 rounded-md p-2 w-24"
                        onChange={(e) => addToCartHandler(item, e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {" "}
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <div>
                        <button
                          onClick={() => removeCartHandler(item._id)}
                          className="text-red-500 hover:text-red-700 hover:scale-150 duration-200 transition-all"
                        >
                          <FaTrash className="" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-100 p-5 rounded-xl text-left space-y-5">
                  <div className="text-xl font-bold ">
                    Số lượng :{" "}
                    {cart.cartItems.reduce((a, c) => a + Number(c.quantity), 0)}
                  </div>
                  <div className="text-2xl font-bold text-black">
                    Số tiền :{" "}
                    {formatPriceToVND(
                      cart.cartItems.reduce(
                        (a, c) => a + c.quantity * c.price,
                        0
                      )
                    )}
                  </div>
                  <div>
                    <button
                      className="bg-gradient-to-r from-primary to-secondary w-full md:w-1/2  hover:scale-105 duration-200 transition-all text-white p-2 rounded-full"
                      disabled={cart.cartItems.length === 0}
                      onClick={() => navigate("/login?redirect=/shipping")}
                    >
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
