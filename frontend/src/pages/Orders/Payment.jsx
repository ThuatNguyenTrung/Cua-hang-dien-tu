import Progress from "./../../components/Progress/Progress";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/api/orderSlice";

import formatPriceToVND from "./../../Utils/fomatPrice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../../redux/features/cartSlice";
import Loader from "./../../components/Loader/Loader";
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const [createOrder, { isLoading }, refetch] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemPrices,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      toast.success(res.message);
      console.log(res);
      navigate(`/order/${res.order._id}`);

      dispatch(clearCartItems());
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="mt-[50px] flex justify-center  bg-secondary/20 min-h-screen">
        <div className="container bg-slate-100 p-10 rounded-md space-y-5">
          <div className="bg-slate-900 p-5 rounded-md">
            <Progress step1 step2 step3 />
          </div>

          <div className="text-white">
            {cart.cartItems.length === 0 ? (
              <div className="text-center text-black">
                Chưa có sản phẩm nào trong giỏ hàng của bạn
              </div>
            ) : (
              <div className="bg-slate-300 p-5 rounded-md">
                {cart.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 sm:grid-cols-2 mb-5 bg-slate-900 p-5 rounded-md gap-7"
                  >
                    <div className="flex gap-5 items-center">
                      <Link
                        to={`/products/${item.name}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <div className="bg-slate-200 p-1 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt="image"
                            className="w-[100px] h-[100px] object-cover rounded-lg hover:scale-110 duration-200 transition-all"
                          />
                        </div>
                      </Link>

                      <div className="flex flex-col gap-5 ">
                        <div className="text-white flex gap-3 items-center">
                          <p className="text-sm">Tên sản phẩm:</p>
                          <p className="text-xl">{item.name}</p>
                        </div>
                        <div className="text-white flex gap-3 items-center">
                          <p className="text-sm">Giá</p>
                          <p className="text-red-500 font-bold text-xl">
                            {formatPriceToVND(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-0 sm:gap-7">
                      <p className="text-white">Số lượng: {item.quantity}</p>
                      <p className="text-white">
                        Tổng tiền:{" "}
                        <span className="text-red-500 font-bold text-xl">
                          {formatPriceToVND(item.price * item.quantity)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-300 p-5 rounded-md">
            <div className="text-xl font-semibold">Tóm tắt đơn hàng </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900 p-5 rounded-md text-white">
              <div>
                <p>Tiền đơn hàng: {formatPriceToVND(cart.itemPrices)}</p>
                <p>Phí giao hàng: {formatPriceToVND(cart.shippingPrice)}</p>
                <p>Thuế VAT: {formatPriceToVND(cart.taxPrice)}</p>
                <p>Tổng thanh toán: {formatPriceToVND(cart.totalPrice)}</p>
              </div>
              <div className="space-y-3">
                <h1 className="text-xl font-bold">Địa chỉ giao hàng</h1>
                <p>
                  <strong>Địa chỉ:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.ward}, {cart.shippingAddress.district},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>
              <div className="space-y-3">
                <h1 className="text-xl font-bold">Phương thức thanh toán</h1>
                <p>
                  {" "}
                  <strong>Phương thức: </strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 duration-200 transition-all font-bold py-2 px-4 rounded-full w-full hover:bg-gradient-to-l"
              onClick={placeOrderHandler}
            >
              Đặt hàng
            </button>

            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
