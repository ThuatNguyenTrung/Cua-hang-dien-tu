import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { FaCaretDown, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineLogin,
  AiOutlineShopping,
} from "react-icons/ai";
import { useState } from "react";
import ResponsiveMenu from "./ResponsiveMenu";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const NavbarLink = [
  {
    id: 1,
    name: "Trang chủ",
    link: "/",
  },
  {
    id: 2,
    name: "Sản phẩm",
    link: "/products",
  },
  {
    id: 3,
    name: "Yêu thích",
    link: "/favorites",
  },
  {
    id: 4,
    name: "Giỏ hàng",
    link: "/carts",
  },
];

export const DropdownLink = [
  {
    id: 1,
    name: "Sản phẩm",
    link: "admin/productlist",
  },
  {
    id: 2,
    name: "Danh mục",
    link: "admin/categorylist",
  },
  {
    id: 3,
    name: "Đơn hàng",
    link: "admin/orderlist",
  },
  {
    id: 4,
    name: "Danh sách tài khoản",
    link: "admin/userlist",
  },

  {
    id: 6,
    name: "Tất cả sản phẩm",
    link: "admin/allproductlist",
  },
];

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const favorites = useSelector((state) => state.favorite.favorites);
  const favoriteCount = favorites.length;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemsCount = cartItems.length;
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const res = await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <nav className="fixed top-0  right-0 w-full py-4 z-50 bg-white text-black shadow-md backdrop:blur-sm">
        <div className="container ">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="text-2xl sm:text-3xl font-bold  text-primary hover:text-secondary tracking-wider duration-200 transition-all"
                onClick={() => window.scrollTo(0, 0)}
              >
                TSTORE
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                {NavbarLink.map(({ id, name, link }) => (
                  <li
                    key={id}
                    className="hover:text-secondary font-semibold hover:scale-105 duration-200 transition-all"
                  >
                    <NavLink
                      onClick={() => window.scrollTo(0, 0)}
                      to={link}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/products"
                onClick={() => window.scrollTo(0, 0)}
                className="block md:hidden"
              >
                <AiOutlineShopping className="text-2xl hover:scale-110 text-primary hover:text-pink-500 duration-200 transition-all" />
              </Link>
              <Link
                to="/favorites"
                onClick={() => window.scrollTo(0, 0)}
                className="relative"
              >
                <FaHeart className="text-2xl hover:scale-110 text-primary hover:text-pink-500 duration-200 transition-all" />
                {favoriteCount > 0 && (
                  <div className="absolute -top-1/2 -right-1/3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                    {favoriteCount}
                  </div>
                )}
              </Link>
              <Link
                to="/carts"
                onClick={() => window.scrollTo(0, 0)}
                className="relative"
              >
                <AiOutlineShoppingCart className="text-2xl hover:scale-110 text-primary hover:text-pink-500 duration-200 transition-all" />
                {cartItemsCount > 0 && (
                  <div className="absolute -top-1/2 -right-1/3 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
                    {cartItemsCount}
                  </div>
                )}
              </Link>
            </div>
            {!userInfo ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 group hover:text-secondary font-semibold hover:scale-105 duration-200 transition-all"
                >
                  <p className="font-semibold hidden group-hover:block text-sm  ">
                    Đăng nhập
                  </p>
                  <AiOutlineLogin className="text-xl " />
                </Link>
                <Link
                  to="/register"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center gap-2 group hover:text-secondary font-semibold hover:scale-105 duration-200 transition-all"
                >
                  <p className="font-semibold hidden group-hover:block text-sm  ">
                    Đăng kí
                  </p>
                  <AiOutlineUserAdd className="text-xl " />
                </Link>
              </div>
            ) : (
              <div className=" group relative">
                <Link className="flex items-center gap-[2px] hover:text-primary font-semibold duration-200 transition-all ">
                  {" "}
                  <span className="hidden sm:block text-xs">Xin chào: </span>
                  <span className="text-sm">{userInfo.user.username}</span>
                  <span>
                    <FaCaretDown className="group-hover:rotate-180 transition-all duration-200" />
                  </span>
                </Link>
                <div className="hidden group-hover:block absolute right-0 p-2 bg-white shadow-md rounded-md w-[160px]">
                  <ul>
                    {userInfo.isAdmin &&
                      DropdownLink.map(({ id, name, link }) => (
                        <li key={id}>
                          <Link
                            to={link}
                            onClick={() => window.scrollTo(0, 0)}
                            className="rounded-md w-full p-2 inline-block hover:bg-primary/10 hover:text-primary duration-200 transition-all text-sm"
                          >
                            {name}
                          </Link>
                        </li>
                      ))}

                    <li>
                      <Link
                        to="/profile"
                        onClick={() => window.scrollTo(0, 0)}
                        state={{ user: userInfo }}
                        className="rounded-md w-full p-2 inline-block hover:bg-primary/10 hover:text-primary duration-200 transition-all text-sm"
                      >
                        Tài khoản của bạn
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={logoutHandler}
                        className="rounded-md w-full p-2 inline-block hover:bg-primary/10 hover:text-primary duration-200 transition-all text-sm"
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="md:hidden block">
              {showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer hover:text-secondary duration-200 transition-all"
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer hover:text-secondary duration-200 transition-all"
                />
              )}
            </div>
          </div>
        </div>
        <ResponsiveMenu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          userInfo={userInfo}
        />
      </nav>
    </>
  );
};

export default Navbar;
