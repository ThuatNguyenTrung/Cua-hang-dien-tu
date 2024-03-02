import { IoCloseOutline } from "react-icons/io5";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categorySlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PopupCategory from "../../components/Popup/PopupCategory";
const CategoryList = () => {
  const { data: categories, refetch } = useGetAllCategoriesQuery();
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);

  const navigate = useNavigate();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createCategory({ name }).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory({
        id: selectedCategory._id,
        name: updateName,
      }).unwrap();
      toast.success(res.message);
      refetch();
      setOpenPopup(false);
      setUpdateName("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!window.confirm("Bạn muốn xóa người dùng này?")) {
        return;
      }
      const res = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(res.message);
      refetch();
      setOpenPopup(false);
      setSelectedCategory(null);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <>
      <div className=" top-0 left-0 bg-black/50 h-[100vh] w-full flex justify-center items-center">
        <div className="container mt-10 bg-white p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center ">
            <div className="text-2xl font-semibold text-primary">
              Danh sách các danh mục ({categories?.length})
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              <IoCloseOutline
                size={30}
                className="text-primary  hover:text-red-500 duration-300 transition-all hover:scale-110"
              />{" "}
            </button>
          </div>
          <form onSubmit={createHandleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Tạo danh mục
              </label>
              <input
                type="text"
                placeholder="Nhập tên danh mục"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
              <button
                className=" bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all "
                type="submit"
              >
                Thêm
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categories?.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-gradient-to-r from-green-900 to-green-300 text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all w-[150px]"
                  onClick={() => {
                    setOpenPopup(true);
                    setUpdateName(category.name);
                    setSelectedCategory(category);
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>
          <PopupCategory
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
