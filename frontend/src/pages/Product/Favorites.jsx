import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
const Favorites = () => {
  const favorites = useSelector((state) => state.favorite.favorites);

  return (
    <div className="py-10 h-min-screen">
      <div className="container bg-secondary/20 p-10 rounded-md text-center space-y-5">
        <div
          data-aos="fade-up"
          className="text-center text-3xl font-bold sm:text-4xl text-primary mb-10"
        >
          Những sản phẩm yêu thích
        </div>

        {favorites?.length === 0 && <div>Chưa có sản phẩm nào yêu thích</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites?.map((product) => (
            <div data-aos="zoom-in" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="w-[150px]  mx-auto bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all hover:bg-gradient-to-l">
          <Link to="/products" onClick={() => window.scrollTo(0, 0)}>
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
