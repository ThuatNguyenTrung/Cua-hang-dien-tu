import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { useEffect } from "react";
import Loader from "./../../components/Loader/Loader";
import { toast } from "react-toastify";
import { credentials } from "../../redux/features/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Mật khẩu không khớp!!");
        return;
      }
      const res = await register({
        username,
        email,
        password,
      }).unwrap();
      dispatch(credentials({ ...res }));
      toast.success(res.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className=" top-0 left-0 w-full h-[100vh] bg-black/50 flex justify-center items-center backdrop:blur-sm ">
        <div className="bg-white p-4 rounded-md w-[400px] shadow-md space-y-4 mt-10">
          <div className="flex justify-between items-center border-b-2 border-primary pb-2">
            <div className="text-2xl font-semibold text-primary">Đăng kí</div>
            <div>
              <IoCloseOutline
                className="text-2xl cursor-pointer hover:text-secondary  duration-200 transition-all "
                onClick={() => navigate("/")}
              />
            </div>
          </div>
          <form onSubmit={HandleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-primary ml-3 font-semibold cursor-pointer"
                >
                  Tên đăng kí
                </label>
                <input
                  type="text"
                  placeholder="Tên đăng kí"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-primary ml-3 font-semibold cursor-pointer"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-primary ml-3 font-semibold cursor-pointer"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-primary ml-3 font-semibold"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                />
              </div>
              <button
                className=" w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Đang đăng kí..." : "Đăng kí"}
              </button>
            </div>
            {isLoading && <Loader />}
          </form>

          <div className="flex gap-3 items-center">
            <div>Bạn đã có tài khoản?</div>
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-secondary inline-block hover:scale-105 duration-200 transition-all"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
