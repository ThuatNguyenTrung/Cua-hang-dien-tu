import { IoCloseOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  useProfileByIdQuery,
  useUpdateByIdMutation,
} from "../../redux/api/usersApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateUsers = () => {
  const { id } = useParams();
  const { data: user } = useProfileByIdQuery(id);
  const [updateUser] = useUpdateByIdMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        id,
        username,
        email,
      }).unwrap();
      toast.success(res.message);
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <div className="top-0 left-0 bg-black/50 h-[100vh] w-full flex justify-center items-center">
        <div className="bg-white p-4 rounded-md w-[400px] shadow-md space-y-4 mt-10">
          <div className="flex justify-between items-center border-b-2 border-primary pb-2">
            <div className="text-2xl font-semibold text-primary">
              Cập nhật tài khoản
            </div>
            <div>
              <IoCloseOutline
                className="text-2xl cursor-pointer hover:text-secondary duration-200 transition-all "
                onClick={() => navigate("/admin/userlist")}
              />
            </div>
          </div>
          <form onSubmit={submitHandler}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-primary ml-3 font-semibold cursor-pointer"
                >
                  Tên
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên"
                  id="name"
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
              <button
                className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 trasition-all text-white rounded-full px-4 py-2"
                type="submit"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUsers;
