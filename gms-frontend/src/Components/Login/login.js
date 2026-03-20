import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight, FiLoader } from "react-icons/fi"; // npm install react-icons

const Login = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "https://gys-aniket-gupta.onrender.com";
  const handleLogin = async () => {
    if (!loginField.userName || !loginField.password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, loginField, { withCredentials: true });
      const userData = res.data.data;
      
      localStorage.setItem('gymName', userData.gymName);
      localStorage.setItem('gymPic', userData.profilePic);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', res.data.token);
      
      toast.success("Welcome back, Admin!");
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  }

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value })
  }

  return (
    <div className="w-full bg-white">
      <div className="space-y-6">
        {/* Input Username */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
            Admin Username
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <FiMail />
            </div>
            <input
              value={loginField.userName}
              onChange={(e) => handleOnChange(e, "userName")}
              type="text"
              placeholder="e.g. admin_jabalpur"
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              <FiLock />
            </div>
            <input
              value={loginField.password}
              onChange={(e) => handleOnChange(e, "password")}
              type="password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300"
            />
          </div>
        </div>


        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black italic tracking-tighter flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <FiLoader className="animate-spin text-xl" />
          ) : (
            <>
              LOGIN TO DASHBOARD <FiArrowRight className="group-hover:translate-x-1 transition" />
            </>
          )}
        </button>

        {/* Support Text */}
        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4">
          Secure Cloud Access Provided by GymPro
        </p>
      </div>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
    </div>
  );
};

export default Login;