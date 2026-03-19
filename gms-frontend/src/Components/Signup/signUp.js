import React, { useState } from "react";
import Modal from "../Modal/modal";
import ForgotPassword from "../ForgotPassword/forgotPassword";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { 
  FiMail, FiLock, FiUser, FiActivity, 
  FiUploadCloud, FiLoader, FiCheckCircle 
} from "react-icons/fi";

const SignUp = () => {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const [registering, setRegistering] = useState(false);
  
  const BASE_URL = "https://gms-1-t3u4.onrender.com";
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  });

  const handleClose = () => setForgetPassword(prev => !prev);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  // 🔷 Image Upload Logic
  const uploadImage = async (event) => {
    const files = event.target.files;
    if (!files[0]) return;

    setLoaderImage(true);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gym-management');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dpyeiobze/image/upload', data);
      setInputField({ ...inputField, profilePic: res.data.url });
      toast.info("Logo uploaded successfully!");
    } catch (err) {
      toast.error("Logo upload failed. Try again.");
    } finally {
      setLoaderImage(false);
    }
  }

  // 🔷 Registration Logic
  const handleRegister = async () => {
    const { email, gymName, userName, password } = inputField;

    if (!email || !gymName || !userName || !password) {
      return toast.warning("⚠️ All fields are required!", {
        position: "top-center",
        theme: "colored"
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    setRegistering(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, inputField);
      toast.success(`🚀 ${gymName} Registered Successfully!`, {
        position: "top-center",
        autoClose: 5000,
      });
      setInputField({
        gymName: "", email: "", userName: "", password: "",
        profilePic: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
      });
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed.";
      toast.error(errorMsg);
    } finally {
      setRegistering(false);
    }
  }

  return (
    <div className="w-full bg-white">
      <div className="space-y-6">
        
        {/* Logo Upload Section */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-24 h-24 mb-4">
            <img 
              src={inputField.profilePic} 
              className={`h-full w-full object-cover rounded-2xl border-4 border-white shadow-xl transition-all duration-500 ${loaderImage ? 'scale-90 blur-sm' : 'scale-100'}`} 
              alt="Gym Logo"
            />
            {loaderImage && (
              <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                <FiLoader className="animate-spin text-2xl" />
              </div>
            )}
            <label className="absolute -bottom-2 -right-2 bg-indigo-600 p-2.5 rounded-xl text-white cursor-pointer hover:bg-indigo-700 shadow-lg transition-all active:scale-90 group">
              <FiUploadCloud className="group-hover:scale-110" />
              <input type="file" onChange={uploadImage} className="hidden" accept="image/*" />
            </label>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gym Branding</p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Gym Name</label>
            <div className="relative group">
              <FiActivity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" placeholder="e.g. Iron Paradise"
                value={inputField.gymName}
                onChange={(e) => handleOnChange(e, "gymName")}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Email</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" placeholder="owner@gym.com"
                value={inputField.email}
                onChange={(e) => handleOnChange(e, "email")}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Owner Username</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" placeholder="admin_user"
                value={inputField.userName}
                onChange={(e) => handleOnChange(e, "userName")}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" placeholder="••••••••"
                value={inputField.password}
                onChange={(e) => handleOnChange(e, "password")}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 space-y-4 text-center">
          <button
            onClick={handleRegister}
            disabled={registering || loaderImage}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black italic tracking-tighter flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 group"
          >
            {registering ? (
              <FiLoader className="animate-spin text-xl" />
            ) : (
              <>
                REGISTER YOUR GYM <FiCheckCircle className="text-lg group-hover:rotate-12 transition-transform" />
              </>
            )}
          </button>

          {/* 🔗 FORGOT PASSWORD LINK - RE-ADDED */}
          <button 
            onClick={() => setForgetPassword(true)}
            className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <span className="underline decoration-slate-200">Reset Password</span>
          </button>
        </div>

      </div>

      {/* MODAL FOR FORGOT PASSWORD */}
      {forgetPassword && (
        <Modal header="Password Recovery" handleClose={handleClose} content={<ForgotPassword />} />
      )}

      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </div>
  );
};

export default SignUp;