import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const data = await await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center bg-black text-white rounded-full relative group">
          {userData.name[0].toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </li>
              )}

              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      <div className="hero-btns flex transition-all">
        <button
          onClick={() => navigate("/login")}
          className="mr-5 flex items-center gap-2 border border-b-blue-500 rounded-full px-6 py-2 text-gray-800"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>
        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-2 bg-blue-500 rounded-full px-6 py-2 text-white hover:bg-blue-800"
        >
          Register
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center py-5 gap-4">
            <li onClick={() => navigate("/")}>Home</li>

            <li onClick={() => navigate("/login")}>Login</li>

            <li onClick={() => navigate("/register")}>Register</li>
          </ul>
        </div>
      )}

      {/* Mobile Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>
    </div>
  );
};

export default Navbar;
