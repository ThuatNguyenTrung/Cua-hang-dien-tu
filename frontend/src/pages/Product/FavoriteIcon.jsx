import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/favoriteSlice";

const FavoriteIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.favorites);

  let isFavorite = false;
  if (favorites && favorites.some((favorite) => favorite._id === product._id)) {
    isFavorite = true;
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer absolute top-3 right-3 hover:scale-150 duration-200 transition-all"
    >
      {isFavorite ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default FavoriteIcon;
