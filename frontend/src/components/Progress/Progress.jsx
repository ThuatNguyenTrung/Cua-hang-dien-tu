import { IoMdCheckbox } from "react-icons/io";
const Progress = ({ step1, step2, step3 }) => {
  return (
    <div className="grid grid-cols-5 text-gray-400">
      <div className="flex flex-col items-center gap-2">
        <p className={`${step1 ? "text-green-500" : ""} text-xs sm:text-sm`}>
          Đăng nhập
        </p>
        <IoMdCheckbox className={`${step1 ? "text-green-500" : ""}`} />
      </div>
      <div
        className={`w-full h-0.5 ${
          step1 ? "bg-green-500" : "bg-gray-400"
        } mt-5`}
      ></div>
      <div className="flex flex-col items-center gap-2 ">
        <p className={`${step2 ? "text-green-500" : ""} text-xs sm:text-sm`}>
          Thanh toán
        </p>
        <IoMdCheckbox className={`${step2 ? "text-green-500" : ""}`} />
      </div>
      <div
        className={`w-full h-0.5 ${
          step2 ? "bg-green-500" : "bg-gray-400"
        } mt-5`}
      ></div>
      <div className="flex flex-col items-center gap-2">
        <p className={`${step3 ? "text-green-500" : ""} text-xs sm:text-sm`}>
          Hoàn tất{" "}
        </p>
        <IoMdCheckbox className={`${step3 ? "text-green-500" : ""}`} />
      </div>
    </div>
  );
};

export default Progress;
