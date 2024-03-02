import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/api/categorySlice";
import {
  useDeleteProductMutation,
  useGetProductDetailQuery,
  useUpdateProductlan2Mutation,
  useUploadImageMutation,
} from "../../redux/api/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();

  const { data: product } = useGetProductDetailQuery(id);

  const { data: categories } = useGetAllCategoriesQuery();
  const [uploadImage] = useUploadImageMutation();
  const [deteteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductlan2Mutation();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setImageUrl(product.image);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setBrand(product.brand);
      setQuantity(product.quantity);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const uploadHandler = async (e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImageUrl(res.image);
      setImage(res.image);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        id,
        image,
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock,
      };

      const res = await updateProduct(productData).unwrap();
      toast.success(res.message);
      navigate("/admin/allproductlist");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteHandler = async () => {
    try {
      if (!window.confirm("Bạn có muốn xóa sản phẩm này?")) {
        return;
      }
      const res = await deteteProduct(id).unwrap();
      toast.success(res.message);
      navigate("/admin/allproductlist");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
        <div className="container bg-white p-4 rounded-md space-y-5 mt-20 mb-10">
          <div className="text-xl text-primary text-center font-semibold ">
            Thêm sản phẩm
          </div>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="product" className="w-40 h-40 mx-auto" />
            </div>
          )}
          <div className="flex items-center justify-center text-center ">
            <label className="block border-2 border-primary w-full cursor-pointer font-bold rounded-full py-6 space-x-3">
              <span className="text-primary">
                {image ? image.name : "Tải ảnh sản phẩm "}
              </span>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/* "
                onChange={uploadHandler}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Tên sản phẩm
              </label>
              <input
                type="text"
                placeholder="Nhập tên ..."
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="price"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Giá tiền
              </label>
              <input
                type="number"
                placeholder="Nhập giá ..."
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="quantity"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Số lượng
              </label>
              <input
                type="number"
                placeholder="Nhập số lượng ..."
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="brand"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Thương hiệu
              </label>
              <input
                type="text"
                placeholder="Nhập thuơng hiệu ..."
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="stock"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Số lượng trong kho
              </label>
              <input
                type="number"
                placeholder="Nhập số lưọng trong kho ..."
                id="stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="category"
                className="text-primary ml-3 font-semibold cursor-pointer"
              >
                Danh mục
              </label>
              <select
                name="category"
                id="category"
                className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">-- Chọn danh mục --</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-[90%] h-[50%] mx-auto">
            <label
              htmlFor="description"
              className="text-primary ml-3 font-semibold cursor-pointer"
            >
              Mô tả sản phẩm
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="2"
              className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-lg px-4 py-2 bg-slate-200"
            ></textarea>
          </div>

          <div className="flex justify-around">
            <button
              className="bg-gradient-to-r from-green-900 to-green-400 hover:bg-gradient-to-l text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all w-[150px]"
              onClick={updateHandler}
            >
              Cập nhật
            </button>
            <button
              className="bg-gradient-to-r from-red-900 to-red-400 hover:bg-gradient-to-l text-white px-4 py-2 rounded-full hover:scale-110 duration-200 transition-all w-[150px]"
              onClick={deleteHandler}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
