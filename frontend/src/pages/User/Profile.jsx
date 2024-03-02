import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMutation } from "../../redux/api/usersApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "./../../components/Loader/Loader";
import { toast } from "react-toastify";
import { credentials } from "../../redux/features/authSlice";

const Profile = () => {
  const location = useLocation();
  const user = location.state;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useUpdateMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Xác nhận mật khẩu không đúng!");
        return;
      }
      const res = await updateProfile({
        username,
        email,
        password,
      }).unwrap();
      toast.success(res.message);
      dispatch(credentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className=" top-0 left-0 w-full h-[100vh] bg-black/50 flex justify-center items-center backdrop:blur-sm ">
        <div className="bg-white p-4 rounded-md w-[400px] shadow-md space-y-4 mt-10">
          <div className="flex justify-between items-center border-b-2 border-primary pb-2">
            <div className="text-2xl font-semibold text-primary">
              Cập nhật tài khoản
            </div>
            <div>
              <IoCloseOutline
                className="text-2xl cursor-pointer hover:text-secondary  duration-200 transition-all "
                onClick={() => navigate("/")}
              />
            </div>
          </div>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-primary ml-3 font-semibold cursor-pointer"
                >
                  Tên
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên"
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
              <div className="flex justify-between">
                <button
                  className="  bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                  type="submit"
                >
                  Cập nhật
                </button>
                <Link
                  to="/user-orders"
                  className=" bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                  type="submit"
                >
                  Đơn hàng của tôi
                </Link>
              </div>
            </div>
            {isLoading && <Loader />}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
