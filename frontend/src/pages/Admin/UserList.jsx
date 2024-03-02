import { Link } from "react-router-dom";
import {
  useDeleteMutation,
  useGetAllQuery,
} from "../../redux/api/usersApiSlice";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

const UserList = () => {
  const { data: users, isLoading, refetch } = useGetAllQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    try {
      if (!window.confirm("Bạn muốn xóa người dùng này?")) {
        return;
      }
      const res = await deleteUser(id).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="top-0 left-0 bg-black/50 h-[100vh] w-full flex justify-center items-center">
          <div className="container mt-10 bg-white p-4 rounded-md ">
            <div className="text-2xl font-semibold text-primary text-center ">
              Danh sách các tài khoản người dùng ({users?.length})
            </div>
            <div>
              <table className="w-full border-2 bg-slate-100 ">
                <thead className="bg-green-500 text-black">
                  <tr>
                    <td className="hidden md:block ">Id</td>
                    <td>Tên</td>
                    <td>Email</td>
                    <td>Admin</td>
                    <td>Sửa</td>
                    <td>Xóa</td>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(users) &&
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b-2 hover:bg-primary hover:text-white"
                      >
                        <td className="hidden md:block w-[80px]">{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.isAdmin ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </td>
                        <td>
                          <Link to={`/admin/update/user/${user._id}`}>
                            <FaEdit className="text-blue-500 hover:scale-150 hover:text-blue-200 duration-200 transition-all" />
                          </Link>
                        </td>
                        <td>
                          {!user.isAdmin && !isDeleting && (
                            <button onClick={() => deleteHandler(user._id)}>
                              <FaTrash className="text-red-500 hover:scale-150 hover:text-red-200 duration-200 transition-all" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserList;
