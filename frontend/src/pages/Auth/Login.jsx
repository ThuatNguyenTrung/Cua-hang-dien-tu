import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { credentials } from "../../redux/features/authSlice";
import Loader from "./../../components/Loader/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectUrl = new URLSearchParams(window.location.search).get(
    "redirect"
  );
  useEffect(() => {
    if (userInfo) {
      navigate(redirectUrl || "/");
    }
  }, [userInfo, redirectUrl, navigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
      toast.success(res.message);
      dispatch(credentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <div className=" top-0 left-0 w-full h-[100vh] bg-black/50 flex justify-center items-center backdrop:blur-sm">
        <div className="bg-white p-4 rounded-md w-[400px] shadow-md space-y-4 mt-10">
          <div className="flex justify-between items-center border-b-2 border-primary pb-2">
            <div className="text-2xl font-semibold text-primary">Đăng nhập</div>
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
              <button
                className=" w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng nhập ..." : "Đăng nhập"}
              </button>
            </div>
            {isLoading && <Loader />}
          </form>
          <div className="flex gap-3 items-center">
            <div>Bạn chưa có tài khoản?</div>
            <Link
              to="/register"
              className="text-primary font-semibold hover:text-secondary inline-block hover:scale-105 duration-200 transition-all"
            >
              Đăng kí
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
