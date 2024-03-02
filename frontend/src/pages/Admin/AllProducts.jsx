import { useGetAllProductsQuery } from "../../redux/api/productSlice";
import moment from "moment";
import "moment/locale/vi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const AllProducts = () => {
  const { data: products, isLoading, refetch } = useGetAllProductsQuery();

  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className=" bg-black/50 py-20">
        <div className="container bg-white p-4 rounded-md w-full shadow-md">
          <div className="text-2xl font-semibold text-primary">
            Tất cả sản phẩm ({isLoading ? "Đang tải..." : products?.length})
          </div>
          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 ">
              {products?.map((product) => (
                <div key={product._id}>
                  <div className="grid grid-cols-3 shadow-md bg-primary/10 space-x-3 p-3 rounded-md h-[200px]">
                    <div className="overflow-hidden rounded-xl  flex items-center justify-center">
                      <div>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover hover:scale-110 hover:skew-x-2 duration-700 transition"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-3">
                      <h1 className="text-xl font-semibold line-clamp-2">
                        {product.name}
                      </h1>
                      <p className="line-clamp-2 text-sm">
                        {product.description}
                      </p>
                      <Link
                        to={`/admin/update/product/${product._id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className=" bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 trasition-all text-white rounded-full px-4 py-2  text-center"
                      >
                        Cập nhật
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <p className=" text-sm text-slate-600">
                        Ngày tạo:{" "}
                        {moment(product.createdAt).format("DD/MM/YYYY")}
                      </p>
                      <p className="font-bold">
                        Giá tiền: {formatPriceToVND(product.price)}
                      </p>
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

export default AllProducts;
