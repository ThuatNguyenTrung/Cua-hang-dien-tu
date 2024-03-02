import { Link } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetAllOrdersQuery,
  useMarkOrderAsPaidByAdminMutation,
} from "../../redux/api/orderSlice";
import Loader from "./../../components/Loader/Loader";

import { toast } from "react-toastify";

const OrderList = () => {
  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery();
  console.log(orders);

  const [deliverOrder] = useDeliverOrderMutation();
  const [paidOrder] = useMarkOrderAsPaidByAdminMutation();

  const deliverOrderHandler = (id) => {
    deliverOrder(id);
    refetch();
    toast.success("Đã giao đơn hàng");
  };

  const paidOrderHandler = (id) => {
    paidOrder(id);
    refetch();
    toast.success("Đã thanh toán đơn hàng");
  };

  return (
    <>
      <div className="my-10 bg-secondary/20 p-5 min-h-screen ">
        <div className="container bg-slate-200 p-10 rounded-md mt-10">
          <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full text-white w-[100px] text-center mb-5 hover:bg-gradient-to-l duration-300 trasition-all hover:scale-105">
            <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
              Trở về
            </Link>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {orders.map((order) => (
                <div key={order._id}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 bg-slate-900 p-3 rounded-md m-1 text-white">
                    <div className="flex items-center gap-5">
                      <div className="overflow-hidden p-1 bg-slate-50 rounded-md">
                        <img
                          src={order.orderItems[0].image}
                          className="w-[100px] h-[100px] rounded-md hover:scale-105 duration-200 transition-all"
                          alt="image"
                        />
                      </div>
                      <div>
                        <p>
                          <strong>ID: </strong> {order._id}
                        </p>
                        <p>Tên: {order.user.username}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-3">
                      <p>
                        <strong>Thời gian:</strong> {order.createdAt}
                      </p>
                      <p>
                        <strong>Tổng tiền:</strong>{" "}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col justify-center space-y-3 items-center">
                        <strong>Trạng thái: </strong>{" "}
                        {order.isPaid ? (
                          <p className="p-1 text-sm text-center bg-green-400 w-[110px]  rounded-full">
                            Hoàn thành
                          </p>
                        ) : (
                          <p
                            onClick={() => paidOrderHandler(order._id)}
                            className="cursor-pointer p-1 text-sm text-center bg-red-400 w-[115px]  rounded-full"
                          >
                            Chưa thanh toán
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col justify-center space-y-3 items-center">
                        <strong>Trạng thái: </strong>{" "}
                        {order.isDelivered ? (
                          <p className="p-1 text-sm text-center bg-green-400  w-[110px] rounded-full">
                            Hoàn thành
                          </p>
                        ) : (
                          <p
                            className="cursor-pointer p-1 text-sm text-center bg-red-400  w-[110px] rounded-full"
                            onClick={() => deliverOrderHandler(order._id)}
                          >
                            Đang giao hàng
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center items-center text-center">
                        <Link
                          className="bg-cyan-500 rounded-full px-3 py-1 hover:bg-pink-600 duration-300 transition-all"
                          to={`/order/${order._id}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Xem chi tiết
                        </Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default OrderList;
