import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailQuery } from "../../redux/api/orderSlice";
import Loader from "../../components/Loader/Loader";
import formatPriceToVND from "../../Utils/fomatPrice";

const PayOrder = () => {
  const { id } = useParams();
  console.log(id);
  const { data: order, isLoading } = useGetOrderDetailQuery(id);
  console.log(order);

  return (
    <>
      <div className="mt-[50px] flex justify-center  bg-secondary/20 min-h-screen">
        <div className="container bg-white pt-10 px-5 rounded-md">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-secondary/20 p-5 rounded-md lg:col-span-2 text-white">
                <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-white w-[100px] text-center mb-5 hover:bg-gradient-to-l duration-300 trasition-all hover:scale-105">
                  <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
                    Trở về
                  </Link>
                </div>
                {order.orderItems.lenght === 0 ? (
                  <h1>Chưa có đơn hàng nào</h1>
                ) : (
                  <div className="space-y-3 ">
                    {order.orderItems.map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-slate-900 p-5 rounded-md"
                      >
                        <div className="flex items-center gap-5 ">
                          <div className="overflow-hidden p-1 bg-slate-50 rounded-md">
                            <img
                              src={item.image}
                              alt="item.name"
                              className="w-[100px] h-[100px] object-cover rounded-lg hover:scale-110 duration-200 transition-all"
                            />
                          </div>
                          <div className="space-y-3">
                            <p className="text-sm">Tên sản phẩm:</p>
                            <h1 className="text-xl">{item.name}</h1>
                          </div>
                        </div>
                        <div className="space-y-3 flex flex-col justify-center">
                          <p>Giá: {formatPriceToVND(item.price)}</p>
                          <p>Số lượng: {item.quantity}</p>
                          <p>
                            Tổng tiền:{" "}
                            {formatPriceToVND(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-secondary/20 p-5 rounded-md space-y-5">
                <div className="space-y-3 bg-slate-900 p-5 rounded-md text-white">
                  <h1>Thông tin giao hàng</h1>
                  <div>
                    <h1>
                      <strong className="text-pink-500">Mã đơn hàng: </strong>
                      {order._id}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Tên: </strong>
                      {order.user.username}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Email: </strong>
                      {order.user.email}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Địa chỉ: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.ward},{" "}
                      {order.shippingAddress.district},{" "}
                      {order.shippingAddress.country}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">
                        Phương thức giao hàng:{" "}
                      </strong>
                      {order.paymentMethod}
                    </h1>
                  </div>
                </div>
                <div className="space-y-3 bg-blue-900 p-5 rounded-md font-bold">
                  {order.isPaid ? (
                    <div className="text-green-500">Đơn hàng đã thanh toán</div>
                  ) : (
                    <div className="text-red-500">Đơn hàng chưa thanh toán</div>
                  )}
                </div>

                <div className="space-y-3 bg-slate-900 p-5 rounded-md text-white">
                  <h1>Thông tin đơn hàng</h1>
                  <div>
                    <h1>
                      <strong className="text-pink-500">Giá tiền: </strong>
                      {formatPriceToVND(order.itemsPrice)}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Phí giao hàng: </strong>
                      {formatPriceToVND(order.shippingPrice)}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Thuế VAT: </strong>
                      {formatPriceToVND(order.taxPrice)}
                    </h1>
                    <h1>
                      <strong className="text-pink-500">Tổng tiền: </strong>
                      {formatPriceToVND(order.totalPrice)}
                    </h1>
                  </div>
                </div>
                <div className="space-y-3 bg-blue-400 p-5 rounded-md font-bold">
                  Thanh toán khi nhận hàng
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayOrder;
