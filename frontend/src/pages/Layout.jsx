import Navbar from "./../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
