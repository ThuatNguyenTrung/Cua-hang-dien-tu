import { IoCloseOutline } from "react-icons/io5";

const PopupCategory = ({
  openPopup,
  setOpenPopup,
  value,
  setValue,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <>
      {openPopup && (
        <div className="fixed top-0 left-0 bg-black/50 h-full w-full flex justify-center items-center">
          <div className="width-[400px] bg-white p-4 rounded-md space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-primary pb-1">
                <h1 className="text-xl font-semibold text-primary">Danh mục</h1>
                <IoCloseOutline
                  className="text-2xl cursor-pointer hover:text-red-500 hover:scale-110 duration-200 transition-all"
                  onClick={() => setOpenPopup(false)}
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Nhập tên danh mục..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                />
                <div className="flex justify-between space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                  >
                    Xóa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupCategory;
