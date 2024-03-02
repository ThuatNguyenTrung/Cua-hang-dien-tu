import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Đã kết nối với mongoDB thành công! ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR: Kết nối với Mongo DB thất bại - ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
