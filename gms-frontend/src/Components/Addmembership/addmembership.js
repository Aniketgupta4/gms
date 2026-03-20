import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
// Icons ke liye (npm install react-icons)
import { FiPlus, FiTag, FiClock, FiLayers, FiCheckCircle } from 'react-icons/fi';

const Addmembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" })
  const [membership, setMembership] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = "https://gys-aniket-gupta.onrender.com";

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  const fechMembership = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plans/get-membership`, { withCredentials: true });
      setMembership(res.data.membership);
    } catch (err) {
      toast.error("Failed to load plans");
    }
  }

  useEffect(() => {
    fechMembership();
  }, [])

  const handleAddMembership = async () => {
    if (!inputField.months || !inputField.price) return toast.warning("Dono fields fill karein!");
    
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/plans/add-membership`, inputField, { withCredentials: true });
      toast.success(res.data.message || "Plan Added!");
      fechMembership(); // List refresh
      setInputField({ months: "", price: "" }); // Reset inputs
    } catch (err) {
      toast.error("Error adding plan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='w-full bg-white flex flex-col max-h-[85vh] overflow-hidden'>
      
      {/* 📋 Section: Active Plans (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-1 mb-8 custom-scrollbar">
        <div className="flex items-center justify-between mb-5 border-b border-slate-50 pb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
            <FiLayers className="text-indigo-600" /> Subscription Tiers
          </p>
          <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
            {membership.length} Active
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {membership.map((item, index) => (
            <div key={index} className="group relative bg-[#0f172a] p-5 rounded-[2rem] border border-slate-800 shadow-xl hover:shadow-indigo-100 transition-all duration-500 overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all" />
               <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black italic text-white leading-none">{item.months}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Mo</span>
                  </div>
                  <div className="mt-4 w-full text-center py-2 bg-white/5 rounded-2xl text-indigo-400 font-black text-xs border border-white/5 group-hover:bg-white/10 group-hover:text-white transition-all">
                    ₹{item.price}
                  </div>
               </div>
            </div>
          ))}
          {membership.length === 0 && (
             <div className="col-span-full py-10 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-2">
                <FiPlus className="text-slate-200 text-3xl" />
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest italic">No Plans Setup Yet</p>
             </div>
          )}
        </div>
      </div>

      <hr className='border-slate-50 mb-8'/>

      {/* ➕ Section: Add Form (Sticky Bottom) */}
      <div className="space-y-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Configure New Strategy</p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Duration</label>
            <div className="relative group">
              <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                value={inputField.months} 
                onChange={(e) => handleOnChange(e, "months")} 
                type='number' 
                placeholder='Months'
                className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-bold placeholder:font-medium'
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price (₹)</label>
            <div className="relative group">
              <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                value={inputField.price} 
                onChange={(e) => handleOnChange(e, "price")} 
                type='number' 
                placeholder='Amount'
                className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-bold placeholder:font-medium'
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleAddMembership}
          disabled={isSubmitting}
          className='w-full py-5 bg-slate-900 text-white font-black italic tracking-tighter rounded-2xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50'
        >
          {isSubmitting ? "PROCESSING..." : <>PUBLISH PLAN <FiCheckCircle /></>}
        </button>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  )
}

export default Addmembership;