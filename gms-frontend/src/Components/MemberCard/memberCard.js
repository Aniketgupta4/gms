import React from "react";
import { Link } from "react-router-dom";
// Fi icons zyada sleek aur modern lagte hain
import { FiPhone, FiCalendar, FiArrowRight } from "react-icons/fi"; 

const MemberCard = ({ item }) => {
  // Check if membership is expired for visual color coding
  const isExpired = new Date(item?.nextBillDate) < new Date();

  return (
    <Link 
      to={`/member/${item?._id}`} 
      className="group relative bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col items-center w-full"
    >
      {/* 🔷 Status Badge (Top-Right) */}
      <div className="absolute top-5 right-6 flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full animate-pulse ${item?.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
        <span className={`text-[10px] font-black uppercase tracking-widest ${item?.status === "Active" ? "text-emerald-600" : "text-rose-600"}`}>
          {item?.status}
        </span>
      </div>

      {/* 📷 Profile Avatar (Squircle Shape) */}
      <div className="relative mb-6 mt-2">
        <div className={`absolute inset-0 blur-2xl opacity-20 rounded-full ${item?.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}></div>
        <div className={`w-24 h-24 rounded-[2.2rem] border-4 p-1 transition-transform duration-500 group-hover:rotate-3 ${item?.status === "Active" ? "border-emerald-50" : "border-rose-50"}`}>
          <img
            className="w-full h-full rounded-[1.8rem] object-cover shadow-inner"
            src={item?.profilePic}
            alt={item?.name}
          />
        </div>
      </div>

      {/* 📝 Name & Mobile */}
      <div className="w-full text-center space-y-1">
        <h3 className="text-lg font-black tracking-tight text-slate-900 uppercase italic leading-tight group-hover:text-indigo-600 transition-colors">
          {item?.name}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[11px] tracking-wide">
          <FiPhone className="text-indigo-500" size={12} />
          <span>+91 {item?.mobileNo}</span>
        </div>
      </div>

      {/* 📅 Billing Status Box (Managed Spacing) */}
      <div className={`w-full mt-6 p-4 rounded-2xl border flex flex-col items-center gap-1 transition-colors ${isExpired ? "bg-rose-50 border-rose-100" : "bg-slate-50 border-slate-100"}`}>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Next Renewal</p>
        <div className="flex items-center gap-2">
          <FiCalendar className={isExpired ? "text-rose-500" : "text-indigo-500"} size={13} />
          <span className={`text-xs font-black italic ${isExpired ? "text-rose-600" : "text-slate-700"}`}>
            {item?.nextBillDate?.slice(0, 10).split('-').reverse().join('-')}
          </span>
        </div>
      </div>

      {/* 🔷 Interaction Overlay (Hidden till hover) */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
          View Profile <FiArrowRight />
        </div>
      </div>
    </Link>
  );
};

export default MemberCard;