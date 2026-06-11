import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
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
          User Login
        </h2>

        <p className="text-center text-sm mb-6">Enter your credentials</p>

        <form onSubmit={onSubmitHandler}>
          <div>
            <label>Email</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none"
                type="email"
                placeholder="Email ID"
                required
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div className="mb-4 flex items-center gap-3 w-full mt-2 mb-6 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs- mt-4">
          Forgot Password?{" "}
          <span
            onClick={() => {
              navigate("/reset-password");
            }}
            className="text-indigo-300 cursor-pointer"
          >
            Reset it here
          </span>
        </p>

        <p className="text-gray-400 text-center text-xs- mt-3">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-indigo-300 cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
