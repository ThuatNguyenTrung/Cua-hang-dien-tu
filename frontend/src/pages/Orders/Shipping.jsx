import Progress from "./../../components/Progress/Progress";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cartSlice";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState(cart.shippingAddress.address || "");
  const [district, setDistrict] = useState(cart.shippingAddress.district || "");
  const [ward, setWard] = useState(cart.shippingAddress.ward || "");
  const [country, setCountry] = useState(
    cart.shippingAddress.country || "Viet Nam"
  );
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    }
  }, [cart, navigate]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, district, ward, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/payment");
  };

  return (
    <>
      <div className="mt-[50px] flex justify-center items-center bg-secondary/20">
        <div className="container  p-10  min-h-screen space-y-5 w-[600px]">
          <div className="bg-slate-900 p-10 rounded-md">
            <Progress step1 step2 />
          </div>
          <div className="bg-slate-900 p-10 rounded-md text-white ">
            <h1 className="text-3xl font-bold text-center text-secondary">
              Thông tin giao hàng
            </h1>
            <div>
              <form onSubmit={submitHandle}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="address"
                      className=" ml-3 font-semibold cursor-pointer"
                    >
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ giao hàng"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2 text-black"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="ward"
                      className=" ml-3 font-semibold cursor-pointer"
                    >
                      Quận/ huyện
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập quận / huyện"
                      id="ward"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="district"
                      className=" ml-3 font-semibold cursor-pointer"
                    >
                      Tỉnh/ Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập tỉnh / thành phố"
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="country"
                      className=" ml-3 font-semibold cursor-pointer"
                    >
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập quốc gia"
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-gray-300 focus:outline-none focus:border-primary rounded-full px-4 py-2 text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block ">Phương thức thanh toán</label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-pink-500"
                          name="paymentMethod"
                          value="PayPal"
                          checked={paymentMethod === "PayPal"} // Kiểm tra nếu paymentMethod là PayPal thì set checked
                          onChange={() => setPaymentMethod("PayPal")} // Thay đổi giá trị của paymentMethod khi chọn
                        />

                        <span className="ml-2">PayPal hoặc Credit Card</span>
                      </label>
                    </div>
                  </div>
                  <button
                    className=" w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full px-4 py-2 hover:bg-gradient-to-l hover:scale-105 duration-200 transition-all"
                    type="submit"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Tiếp tục
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
