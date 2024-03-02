import { useGetAllProductsQuery } from "../redux/api/productSlice";
import ProductCard from "./Product/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useGetAllCategoriesQuery } from "../redux/api/categorySlice";
import { IoMdSearch } from "react-icons/io";

const Shop = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const { data: allProducts, isLoading: isLoadingAllProducts } =
    useGetAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState([]);

  //console.log(selectedCategory);
  const { data: allCategories, isLoading: isLoadingAllCategories } =
    useGetAllCategoriesQuery();
  //console.log(allCategories);

  useEffect(() => {
    if (!isLoadingAllProducts && allProducts) {
      setDataProducts(allProducts);
    }
  }, [allProducts, isLoadingAllProducts]);

  const handleChangeCategory = (value, id) => {
    const newChecked = value
      ? [...selectedCategory, id]
      : selectedCategory.filter((item) => item !== id);
    setSelectedCategory(newChecked);
  };

  const productsFilter = dataProducts?.filter((product) => {
    if (selectedCategory.length === 0) {
      return true;
    }
    return selectedCategory.includes(product.category);
  });

  const uniqueBrands = [
    ...new Set(dataProducts.map((product) => product.brand)),
  ];

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const totalPages = Math.ceil(dataProducts?.length / productsPerPage);

  const handleBrandChange = (brand) => {
    const products = allProducts?.filter((product) => product.brand === brand);
    setDataProducts(products);
  };

  const handlePriceChange = (e) => {
    const prices = e.target.value;
    let minRange = prices.split("-")[0];
    let maxRange = prices.split("-")[1];

    if (maxRange === "greater") {
      maxRange = Infinity;
    }

    const products = allProducts?.filter(
      (product) => product.price >= minRange && product.price <= maxRange
    );
    setDataProducts(products);
    toggleMenu();
  };

  const currentProducts = productsFilter.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const [openmenu, setOpenmenu] = useState(false);
  const toggleMenu = () => {
    setOpenmenu(!openmenu);
  };

  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchKeyword(keyword);
    const products = allProducts?.filter((product) => {
      return product.name.toLowerCase().includes(keyword);
    });
    setDataProducts(products);
  };

  return (
    <>
      <div className="p-10">
        <div className="container bg-secondary/20 p-10 rounded-md my-10 min-h-screen relative">
          <div className="flex flex-wrap gap-[3%] ">
            {/* lọc */}
            {/* Desktop */}
            <div className=" hidden lg:block w-[17%] h-[150vh]">
              <div className="space-y-5 mt-[60px] bg-secondary/20 p-5 rounded-md">
                {/* Danh mục */}
                <div>
                  <h1 className="text-xl font-bold  text-center text-white bg-gradient-to-r from-primary to-secondary rounded-full p-2">
                    Danh mục
                  </h1>
                  <div>
                    {isLoadingAllCategories ? (
                      <Loader />
                    ) : (
                      allCategories?.map((category) => (
                        <div key={category._id}>
                          <div className="flex items-center gap-2 ml-5">
                            <input
                              type="checkbox"
                              id={category._id}
                              className="w-4 h-4 focus:ring-secondary focus:ring-2 "
                              onChange={(e) =>
                                handleChangeCategory(
                                  e.target.checked,
                                  category._id
                                )
                              }
                            />
                            <label htmlFor={category._id}>
                              {category.name}
                            </label>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                {/* Thương hiệu */}
                <div>
                  <h1 className="text-xl font-bold mb-5 text-center text-white bg-gradient-to-r from-primary to-secondary rounded-full p-2">
                    Thương hiệu
                  </h1>
                  <div>
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center gap-2 ml-5">
                        <input
                          type="radio"
                          id={brand}
                          name="brand"
                          onChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={brand}> {brand}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Giá */}
                <div>
                  <h1 className="text-xl font-bold  text-center text-white bg-gradient-to-r from-primary to-secondary rounded-full p-2">
                    Giá
                  </h1>
                  <div className="flex items-center p-3">
                    <select
                      name="price"
                      className="w-full rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      onChange={handlePriceChange}
                    >
                      <option value="0-greater"> Tất cả</option>
                      <option value="0-1000000">Từ 0 đến 1 triệu</option>
                      <option value="1000000-5000000">Từ 1 đến 5 triệu </option>
                      <option value="5000000-10000000">
                        Từ 5 đến 10 triệu
                      </option>
                      <option value="10000000-20000000">
                        Từ 10 đến 20 triệu
                      </option>
                      <option value="20000000-greater">Trên 20 triệu</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    className="text-xl font-bold text-white bg-black hover:bg-secondary rounded-full p-2 w-full duration-300 transition-all hover:text-black"
                    onClick={() => window.location.reload()}
                  >
                    Làm mới
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile */}
            <div className="lg:hidden w-[100%]">
              <div className="absolute top-0 right-0 px-4 py-1 bg-slate-900 rounded-md ">
                <button
                  className="text-xl font-semibold text-white hover:text-secondary duration-200 transition-all"
                  onClick={toggleMenu}
                >
                  Bộ lọc
                </button>
              </div>

              <div
                className={`${
                  openmenu ? "left-0" : "-left-full"
                } flex flex-col justify-between absolute z-50 top-0 px-4 py-1 bg-slate-100 w-[70%] h-[400px] duration-100 transition-all ease-in-out `}
              >
                <div className="space-y-5">
                  <h1 className="text-xl font-semibold text-center text-white bg-primary rounded-full">
                    Danh mục
                  </h1>
                  <div>
                    {isLoadingAllCategories ? (
                      <Loader />
                    ) : (
                      allCategories?.map((category) => (
                        <div key={category._id}>
                          <div className="flex items-center gap-2 ml-5">
                            <input
                              type="checkbox"
                              id={category._id}
                              className="w-4 h-4 focus:ring-secondary focus:ring-2 "
                              onChange={(e) => {
                                handleChangeCategory(
                                  e.target.checked,
                                  category._id
                                );
                                toggleMenu();
                              }}
                            />
                            <label htmlFor={category._id}>
                              {category.name}
                            </label>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-center text-white bg-primary rounded-full ">
                      Giá
                    </h1>
                    <div className="flex items-center p-3">
                      <select
                        name="price"
                        className="w-full rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        onChange={handlePriceChange}
                      >
                        <option value="0-greater"> Tất cả</option>
                        <option value="0-1000000">Từ 0 đến 1 triệu</option>
                        <option value="1000000-5000000">
                          Từ 1 đến 5 triệu{" "}
                        </option>
                        <option value="5000000-10000000">
                          Từ 5 đến 10 triệu
                        </option>
                        <option value="10000000-20000000">
                          Từ 10 đến 20 triệu
                        </option>
                        <option value="20000000-greater">Trên 20 triệu</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <button
                      className="text-xl font-bold text-white bg-black hover:bg-secondary rounded-full p-2 w-full duration-300 transition-all hover:text-black"
                      onClick={() => window.location.reload()}
                    >
                      Làm mới
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sản phẩm */}
            <div className="lg:w-[80%] w-full">
              <div className="flex items-center justify-between">
                <h1
                  data-aos="zoom-out"
                  className="text-3xl font-bold mb-5 text-center"
                >
                  Danh sách sản phẩm
                </h1>
                <div className="flex justify-between items-center gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      value={searchKeyword}
                      onChange={handleSearch}
                      className="w-[130px] sm:w-[200px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary "
                    />
                    <IoMdSearch className="text-gray-500 hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                  </div>
                </div>
              </div>

              <div>
                {isLoadingAllProducts ? (
                  <Loader />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-x-4 space-y-4 sm:space-x-0 sm:space-y-0 items-center justify-center">
                    {currentProducts?.map((product) => (
                      <div
                        data-aos="zoom-in"
                        key={product._id}
                        className="w-full h-[350px] mx-auto rounded-md"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}

                <Pagination
                  totalPages={totalPages > 0 ? totalPages : 1}
                  currentPage={currentPage > 0 ? currentPage : 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
