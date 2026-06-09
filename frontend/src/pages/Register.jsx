import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
          phoneNumber,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 mt-30 mb-15 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semi-bold text-white text-center mb-3">
          User Registration
        </h2>

        <p className="text-center text-sm mb-3">Create your account</p>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="text-sm">Full Name</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none "
                type="email"
                placeholder="your@mail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Phone Number</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.phone_icon} alt="" width="12px" />
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                // onChange={(e) => setName(e.target.value)}
                // value={name}
                className="bg-transparent outline-none"
                type="phone"
                placeholder="123456789"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Password</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm">Confirm Password</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 mb-6 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="bg-transparent outline-none"
                type="password"
                placeholder="********"
                required
              />
            </div>
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Create Account
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs- mt-4">
          Already have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-indigo-300 cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
