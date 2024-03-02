import { Link } from "react-router-dom";
import { NavbarLink } from "../Navbar/Navbar";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-950 text-white py-10">
        <div className="container ">
          <div className="grid grid-cols-1 md:grid-cols-2 pb-20 pt-5 gap-10">
            <div className="text-center md:text-left space-y-3">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <h1 className="text-3xl tracking-wider font-bold hover:text-secondary duration-200 transition-all shadow-lg hover:blur-xs text-primary">
                  TSTORE
                </h1>
              </Link>

              <p className="text-gray-400 ">
                Khám phá thế giới công nghệ tại{" "}
                <span className="text-secondary font-bold">TSTORE</span> - nơi
                bạn có thể tìm thấy những sản phẩm công nghệ hàng đầu cùng với
                dịch vụ mua sắm trực tuyến tiện lợi và an toàn. Đặt hàng ngay
                hôm nay để trải nghiệm sự thuận tiện và chất lượng vượt trội của
                chúng tôi!
              </p>
            </div>
            <div className="grid grid-cols-2">
              <div className=" space-y-5">
                <h1 className="text-xl tracking-wider font-bold hover:text-secondary duration-200 transition-all ">
                  Liên kết
                </h1>
                <div className="flex flex-col space-y-3">
                  {NavbarLink.map(({ id, name, link }) => (
                    <Link
                      onClick={() => window.scrollTo(0, 0)}
                      key={id}
                      to={link}
                      className="inline-block hover:text-secondary"
                    >
                      <p>{name}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className=" space-y-5">
                <h1 className="text-xl tracking-wider font-bold hover:text-secondary duration-200 transition-all ">
                  Địa chỉ
                </h1>
                <div className="flex flex-col space-y-5">
                  <div className="flex items-center gap-3">
                    <FaLocationArrow />
                    <p>Khánh Hòa , Việt Nam</p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <FaMobileAlt />
                    <p>+84 327748271</p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                      <FaInstagram className="text-3xl hover:text-secondary duration-300" />
                    </Link>
                    <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                      <FaFacebook className="text-3xl hover:text-secondary duration-200" />
                    </Link>
                    <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                      <FaLinkedin className="text-3xl hover:text-secondary duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
