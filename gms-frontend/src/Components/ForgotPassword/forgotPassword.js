import React, { useState } from "react";
import Loader from "../Loader/loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiMail, FiShield, FiLock, FiArrowRight, FiCheckCircle } from "react-icons/fi"; // npm install react-icons

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentValue, setContentValue] = useState("Send Verification Code");
  const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" });
  const [loader, setLoader] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOTP();
    } else {
      changePassword();
    }
  };

  const sendOtp = async () => {
    if (!inputField.email) return toast.warning("Please enter your email");
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:4000/auth/reset-password/sendOtp", { email: inputField.email });
      setEmailSubmit(true);
      setContentValue("Verify OTP");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error sending OTP");
    } finally {
      setLoader(false);
    }
  };

  const verifyOTP = async () => {
    if (!inputField.otp) return toast.warning("Please enter the OTP");
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:4000/auth/reset-password/checkOtp", { email: inputField.email, otp: inputField.otp });
      setOtpValidate(true);
      setContentValue("Update Password");
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoader(false);
    }
  };

  const changePassword = async () => {
    if (!inputField.newPassword) return toast.warning("Enter your new password");
    setLoader(true);
    try {
      const res = await axios.post("http://localhost:4000/auth/reset-password", { email: inputField.email, newPassword: inputField.newPassword });
      toast.success(res.data.message);
      // Optional: Redirect to login after success
    } catch (err) {
      toast.error(err.response?.data?.error || "Password reset failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="w-full bg-white animate-in fade-in duration-500">
      
      {/* 🔷 STEP INDICATOR */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className={`flex flex-col items-center gap-1 ${!emailSubmit ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${!emailSubmit ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>1</div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Email</span>
        </div>
        <div className="h-[2px] flex-1 bg-slate-100 mx-2 mb-4"></div>
        <div className={`flex flex-col items-center gap-1 ${emailSubmit && !otpValidate ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${emailSubmit && !otpValidate ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>2</div>
          <span className="text-[10px] font-black uppercase tracking-tighter">OTP</span>
        </div>
        <div className="h-[2px] flex-1 bg-slate-100 mx-2 mb-4"></div>
        <div className={`flex flex-col items-center gap-1 ${otpValidate ? 'text-indigo-600' : 'text-slate-300'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${otpValidate ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>3</div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Reset</span>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* 📧 EMAIL INPUT */}
        {!emailSubmit && (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Admin Email</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
              <input
                type="email"
                placeholder="Enter registered email"
                value={inputField.email}
                onChange={(e) => handleOnChange(e, "email")}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all font-medium"
              />
            </div>
          </div>
        )}

        {/* 🔢 OTP INPUT */}
        {emailSubmit && !otpValidate && (
          <div className="space-y-2 animate-in slide-in-from-right-4 duration-300">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Verification Code</label>
            <div className="relative group">
              <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={inputField.otp}
                onChange={(e) => handleOnChange(e, "otp")}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all font-bold tracking-[0.5em] text-center"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-bold italic text-center">Check your inbox for the reset code.</p>
          </div>
        )}

        {/* 🔒 NEW PASSWORD INPUT */}
        {otpValidate && (
          <div className="space-y-2 animate-in slide-in-from-right-4 duration-300">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">New Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
              <input
                type="password"
                placeholder="••••••••"
                value={inputField.newPassword}
                onChange={(e) => handleOnChange(e, "newPassword")}
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all font-medium"
              />
            </div>
          </div>
        )}

        {/* 🚀 SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loader}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black italic tracking-tighter flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all active:scale-95 shadow-xl disabled:opacity-50 group"
        >
          {loader ? "PROCESSING..." : (
            <>
              {contentValue.toUpperCase()} 
              {otpValidate ? <FiCheckCircle /> : <FiArrowRight className="group-hover:translate-x-1 transition" />}
            </>
          )}
        </button>

      </div>

      {loader && <Loader />}
      
      {/* Toast styling match */}
      <ToastContainer position="bottom-center" theme="dark" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;