import Slider from "react-slick";
import moment from "moment";
import "moment/locale/vi";
import {
  useGetRandomProductsQuery,
  useGetTopProductsQuery,
} from "../redux/api/productSlice";
import ProductCard from "./Product/ProductCard";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import FavoriteIcon from "./Product/FavoriteIcon";
import img1 from "../../../uploads/images/img1.png";
import img2 from "../../../uploads/images/img2.png";
import img3 from "../../../uploads/images/img3.png";
import Loader from "./../components/Loader/Loader";
import formatPriceToVND from "./../Utils/fomatPrice";
import { useEffect, useState } from "react";

const ImageList = [
  {
    id: 1,
    image: img1,
    title: "Khám phá Thế Giới Công Nghệ với Các Sản Phẩm PC Đỉnh Cao",
    description:
      "Trải nghiệm công nghệ mới mẻ và hiệu suất vượt trội với các sản phẩm PC đa dạng và tiên tiến nhất.",
  },
  {
    id: 2,
    image: img3,
    title: "Theo Dõi Sức Khỏe và Phong Cách với Smartwatch",
    description:
      "Đồng hành cùng bạn trong mọi hoạt động hàng ngày với smartwatch thông minh, từ theo dõi sức khỏe đến thông báo thông minh và nhiều tính năng hấp dẫn khác.",
  },
  {
    id: 3,
    image: img2,
    title: "Bắt Kịp Mọi Khoảnh Khắc với Công Nghệ Camera Hiện Đại",
    description:
      "Ghi lại những khoảnh khắc đáng nhớ một cách chân thực và sống động nhất với các sản phẩm camera chất lượng, từ máy ảnh du lịch đến camera an ninh gia đình.",
  },
];

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [getrandomProducts, setGetrandomProducts] = useState([]);
  const { data: products, isLoading: topProductsLoading } =
    useGetTopProductsQuery();

  const { data: randomProducts, isLoading: randomProductsLoading } =
    useGetRandomProductsQuery();

  useEffect(() => {
    if (!topProductsLoading && products) {
      setTopProducts(products);
    }
  }, [topProductsLoading, products]);
  useEffect(() => {
    if (!randomProductsLoading && randomProducts) {
      setGetrandomProducts(randomProducts);
    }
  }, [randomProductsLoading, randomProducts]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const settings2 = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Hero section */}
      <div>
        <div className="relative overflow-hidden min-h-[500px] sm:h-[650px] bg-primary/10 flex justify-center items-center duration-200 transition-all">
          <div className="h-[700px] w-[500px] sm:w-[700px] bg-secondary/50 absolute rotate-45  rounded-3xl -top-1/2 right-0 z-5"></div>
          <div className="container pb-10 sm:pt-0">
            <Slider {...settings}>
              {ImageList.map((item) => (
                <div key={item.id} data-aos="zoom-in" data-aos-once="true">
                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
                    <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left  relative z-10 order-2 sm:order-1">
                      <h1
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                      >
                        {item.title}
                      </h1>
                      <p
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="300"
                        className="text-sm"
                      >
                        {item.description}
                      </p>
                      <div>
                        <Link
                          to="/products"
                          className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all hover:bg-gradient-to-l"
                        >
                          Mua ngay
                        </Link>
                      </div>
                    </div>
                    <div className="order-1 sm:order-2 sm:mt-0 mt-10">
                      <img
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        src={item.image}
                        alt=""
                        className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] object-contain mx-auto sm:mx-0 lg:scale-125"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* New product */}
      <div className="py-10 ">
        <div className="container bg-secondary/20 p-10 rounded-md text-center space-y-5">
          <div
            data-aos="zoom-out"
            data-aos-offset="0"
            data-aos-duration="500"
            data-aos-delay="300"
            className="text-center text-3xl font-bold sm:text-4xl text-primary mb-10"
          >
            Những sản phẩm nổi bật
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topProductsLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              topProducts?.map((product) => (
                <div key={product._id} data-aos="fade-up" data-aos-delay="300">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className="w-[150px]  mx-auto bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all hover:bg-gradient-to-l">
            <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
              Shop
            </Link>
          </div>
        </div>
      </div>
      {/* Products Carousel */}
      <div className="py-10 bg-secondary/10">
        <div className="container">
          <div
            data-aos="slide-right"
            className="text-center text-3xl font-bold sm:text-4xl text-primary mb-10"
          >
            Sản phẩm khác
          </div>
          <Slider {...settings2}>
            {randomProductsLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              getrandomProducts?.map((product) => (
                <div data-aos="fade-up" key={product._id}>
                  <div className="p-4 shadow-lg rounded-lg mx-4 bg-green-50 h-[520px] flex flex-col justify-between">
                    <div className="overflow-hidden relative">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full rounded-lg h-[300px] object-cover shadow-lg hover:scale-110 duration-200 transition-all hover:skew-x-2"
                      />
                      <FavoriteIcon product={product} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 bg-white rounded-lg p-2 gap-2">
                      <div className="flex flex-col justify-center gap-4">
                        <Link
                          to={`/products/${product.name}`}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <h1 className="text-xl font-bold text-primary">
                            {product.name}
                          </h1>
                        </Link>
                        <p className="text-xl lg:text-3xl font-bold">
                          {formatPriceToVND(product.price)}
                        </p>
                        <p className="text-sm line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="flex flex-col justify-between gap-4">
                          <div className="flex gap-2 items-center">
                            <FaStore />
                            <h1>Thương hiệu</h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <FaClock />
                            <h1>{moment(product.createdAt).fromNow()}</h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <FaStar />
                            <h1>Đánh giá: {product.numReviews}</h1>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                          <div className="flex gap-2 items-center">
                            <FaStar />
                            <h1>Rating: {Math.round(product.rating)}</h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <FaShoppingCart />
                            <h1>Số lượng: {product.quantity}</h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <FaBox />
                            <h1>Kho: {product.countInStock}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Home;
