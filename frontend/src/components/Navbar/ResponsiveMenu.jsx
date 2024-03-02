import { Link } from "react-router-dom";
import { NavbarLink } from "./Navbar";
import { FaUserCircle } from "react-icons/fa";

const ResponsiveMenu = ({ showMenu, setShowMenu, userInfo }) => {
  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-full"
      } fixed top-0 bottom-0 bg-white h-screen w-[75%] shadow-md text-black z-999 pt-16 px-8 flex flex-col justify-between pb-10 trasition-all duration-300 ease-in-out md:hidden`}
    >
      <div>
        <div className="flex items-center justify-start gap-4 text-primary">
          <FaUserCircle size={50} />
          <div className="text-2xl font-bold">
            <h1>Xin Chào</h1>
            {userInfo && <p className="ml-4">{userInfo.user.username}</p>}
          </div>
        </div>
        <nav className="mt-12">
          <ul className="space-y-6 text-xl">
            {NavbarLink.map(({ id, name, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  onClick={() => setShowMenu(!showMenu)}
                  className="hover:text-secondary duration-200 transition-all inline-block mb-5 hover:scale-105 "
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <h1>
          Trang web được tạo bởi{" "}
          <span className="text-primary hover:text-secondary font-bold cursor-pointer inline-block hover:scale-105">
            THUẬT
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
