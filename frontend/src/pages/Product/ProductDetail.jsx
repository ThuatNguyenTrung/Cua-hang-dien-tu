import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useCreateReviewBynameMutation,
  useFindProductByNameQuery,
  useGetRelativeProductQuery,
} from "../../redux/api/productSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import moment from "moment";

import Ratings from "./Ratings";
import { useState, useEffect } from "react"; // Thêm useEffect vào danh sách import
import { IoCartOutline } from "react-icons/io5";
import FavoriteIcon from "./FavoriteIcon";
import { useSelector } from "react-redux";

import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import formatPriceToVND from "../../Utils/fomatPrice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [createReviewByname] = useCreateReviewBynameMutation();
  const { name } = useParams();
  const { data: product, isLoading, refetch } = useFindProductByNameQuery(name);
  const { data: relativeProducts, isLoading: relativeProductsLoading } =
    useGetRelativeProductQuery(name);

  // Thêm useEffect để tự động refetch dữ liệu khi name thay đổi
  useEffect(() => {
    refetch();
  }, [name, refetch]);

  const submitHandler = async () => {
    try {
      const res = await createReviewByname({
        name,
        rating,
        comment,
      });
      console.log(res);
      toast.success(res.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng"),
      {
        position: "top-right",
        autoClose: 2000,
      };
  };

  return (
    <div className="py-10 h-min-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container bg-secondary/20 p-10 rounded-md space-y-5">
          <div className="w-[150px] text-center bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all hover:bg-gradient-to-l">
            <Link
              to="/products"
              onClick={() => window.scrollTo(0, 0)}
              className="font-bold"
            >
              Trở về
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-hidden my-auto">
              <div className="relative">
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-[300px] object-cover hover:scale-110 duration-200 transition-all rounded-3xl"
                />
                <FavoriteIcon product={product} />
              </div>
            </div>
            <div>
              <div className="space-y-3 text-center">
                <h1 className="text-3xl font-bold text-primary">
                  {product.name}
                </h1>
                <p className="text-slate-600 text-left">
                  {product.description}
                </p>
                <p className="text-4xl font-bold">
                  Giá: {formatPriceToVND(product.price)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 my-5 justify-items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FaStore className="text-primary" />
                    <p className="text-sm">Thương hiệu</p>
                    <p className="font-semibold">{product.brand}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-primary" />
                    <p className="text-sm">Tạo:</p>
                    <p className="font-semibold">
                      {moment(product.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-primary" />
                    <p className="text-sm">Đánh giá</p>
                    <p className="font-semibold">{product.numReviews}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Ratings value={product.rating} />
                    <p>{product.numReviews} Đánh giá</p>
                  </div>
                  {/* Thêm các thông tin khác về sản phẩm */}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-primary" />
                    <p className="text-sm">Rating</p>
                    <p className="font-semibold">
                      {Math.round(product.rating)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShoppingCart className="text-primary" />
                    <p className="text-sm">Số lượng</p>
                    <p className="font-semibold">{product.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBox className="text-primary" />
                    <p className="text-sm">Kho</p>
                    <p className="font-semibold">{product.countInStock}</p>
                  </div>
                  <div>
                    {product.countInStock > 0 && (
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-black"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1} className="w-full">
                            {" "}
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="flex w-[150px] mx-auto justify-center items-center gap-2 bg-primary hover:bg-secondary hover:scale-105 duration-200 transition-all text-white p-2 rounded-full"
            onClick={addToCartHandler}
          >
            <p>Thêm vào giỏ</p> <IoCartOutline />
          </button>

          <div className="mt-10 bg-white p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-primary text-center">
                  {" "}
                  Đánh giá của bạn
                </h1>
                <div>
                  {userInfo ? (
                    <form className="space-y-2" onSubmit={submitHandler}>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="rating" className="font-semibold">
                          Đánh giá
                        </label>
                        <select
                          name="rating"
                          id="rating"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        >
                          <option value="">Chọn đánh giá</option>
                          <option value="1">Rất Kém</option>
                          <option value="2">Kém</option>
                          <option value="3">Trung Bình</option>
                          <option value="4">Tốt </option>
                          <option value="5">Xuất Sắc</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="comment" className="font-semibold">
                          Nội dung
                        </label>
                        <textarea
                          name="comment"
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        ></textarea>
                      </div>

                      <button
                        className="w-full bg-primary hover:bg-secondary hover:scale-105 duration-200 transition-all text-white p-2 rounded-full"
                        type="submit"
                      >
                        Gửi
                      </button>
                    </form>
                  ) : (
                    <div>
                      Vui lòng <Link to="/login">Đăng nhập</Link> để viết đánh
                      giá
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center">
                {product.reviews.length === 0 ? (
                  <div className="text-3xl text-primary">Chưa có đánh giá</div>
                ) : (
                  <div className="bg-secondary/20 p-10 rounded-md w-full translate-y-5">
                    {product.reviews.map((review) => (
                      <div key={review._id} className="space-y-2">
                        <div className="flex justify-between">
                          <p className="font-semibold">{review.name}</p>
                          {review.createdAt && (
                            <p>{review.createdAt.substring(0, 10)}</p>
                          )}
                        </div>
                        <p>{review.comment}</p>
                        <Ratings value={review.rating} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="py-10 bg-secondary/30 rounded-3xl px-5">
            <div className="text-center text-xl font-bold sm:text-4xl text-primary mb-10">
              Sản phẩm liên quan
            </div>

            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {relativeProductsLoading ? (
                  <Loader />
                ) : (
                  relativeProducts?.map((productRelated) => (
                    <div
                      key={productRelated._id}
                      className="p-4 bg-green-100 rounded-xl"
                    >
                      <ProductCard product={productRelated} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
