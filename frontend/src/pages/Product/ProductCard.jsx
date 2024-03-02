import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";
import Ratings from "./Ratings";
import formatPriceToVND from "../../Utils/fomatPrice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (p, quantity) => {
    dispatch(addToCart({ ...p, quantity }));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng"),
      {
        position: "top-right",
        autoClose: 2000,
      };
  };

  return (
    <div className="group shadow bg-slate-900 text-white rounded-lg">
      <div className="relative overflow-hidden p-2">
        <img
          src={product.image}
          alt=""
          className="w-full h-[250px] object-cover rounded-md hover:scale-110 duration-200 transition-all hover:skew-x-3"
        />
        <FavoriteIcon product={product} />
        <div className="hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <button
            onClick={() => addToCartHandler(product, 1)}
            className="flex items-center gap-2 bg-primary hover:bg-secondary hover:scale-105 duration-200 transition-all text-white p-2 rounded-full"
          >
            <p>Thêm vào giỏ</p> <IoCartOutline />
          </button>
        </div>
      </div>
      <div className="h-[90px]">
        <Link
          to={`/products/${product.name}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="flex flex-col justify-between items-between ">
            <div className="flex justify-between items-center px-5 pt-3">
              <p className="font-bold line-clamp-1">{product.name}</p>
              <p className="font-bold text-2xl hover:scale-105 duration-200 transition-all ">
                {formatPriceToVND(product.price)}
              </p>
            </div>
            <div className="flex justify-between items-center px-5 pb-3">
              <Ratings value={product.rating} />
              <p className="">{product.numReviews} Đánh giá</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
