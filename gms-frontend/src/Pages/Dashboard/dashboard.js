import React, { useState, useEffect, useRef } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickOutside = e => {
      if (accordianDashboard && ref.current && !ref.current.contains(e.target)) {
        setAccordianDashboard(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => document.removeEventListener("mousedown", checkIfClickOutside);
  }, [accordianDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem('func', value);
  };

  const cardData = [
    { to: '/member', label: "Joined Members", icon: <PeopleAltIcon />, color: "text-emerald-500", bg: "bg-emerald-50", func: "" },
    { to: '/specific/monthly', label: "Monthly Joined", icon: <SignalCellularAltIcon />, color: "text-indigo-500", bg: "bg-indigo-50", func: "monthlyJoined" },
    { to: '/specific/expire-with-in-3-days', label: "Expiring within 3 days", icon: <AccessAlarmIcon />, color: "text-rose-500", bg: "bg-rose-50", func: "threeDayExpire" },
    { to: '/specific/expire-with-in-4-7-days', label: "Expiring within 4-7 days", icon: <AccessAlarmIcon />, color: "text-orange-500", bg: "bg-orange-50", func: "fourToSevenDayExpire" },
    { to: '/specific/expired', label: "Expired Members", icon: <ErrorIcon />, color: "text-red-600", bg: "bg-red-50", func: "expired" },
    { to: '/specific/inactive-members', label: "Inactive Members", icon: <ReportIcon />, color: "text-slate-400", bg: "bg-slate-100", func: "inactiveMembers" },
  ];

  return (
    /* 🛠️ LAYOUT FIX: Added lg:pl-72 and w-full to align perfectly with the fixed sidebar */
    <div className="flex-1 min-h-screen bg-[#f8fafc] lg:pl-72 w-full transition-all duration-300 relative overflow-x-hidden">
      
      <div className="p-4 md:p-10 w-full max-w-[1600px] mx-auto">
        
        {/* 🔷 CLEAN DARK HEADER */}
        <header className="w-full bg-[#0f172a] shadow-2xl rounded-[2rem] mb-12 overflow-visible relative border border-slate-800">
          <div className="px-8 h-24 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg italic font-black text-xl">
                G
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black tracking-widest text-white uppercase italic leading-none">Management Center</h2>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mt-2">Live Insights • 2026</p>
              </div>
            </div>
            
            <div className="relative" ref={ref}>
              <button 
                onClick={() => setAccordianDashboard(!accordianDashboard)}
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white border border-slate-700 transition-all active:scale-90"
              >
                <HelpOutlineIcon fontSize="small" />
              </button>
              {accordianDashboard && (
                <div className="absolute right-0 mt-4 w-72 p-6 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <p className="text-xs font-black text-indigo-600 uppercase mb-2 tracking-widest">Guide</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">Click cards to manage records.</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 🔷 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Link 
              key={index}
              to={card.to} 
              onClick={() => card.func && handleOnClickMenu(card.func)} 
              className="group relative bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <div className={`w-24 h-24 ${card.bg} ${card.color} rounded-[2rem] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500 shadow-inner`}>
                {React.cloneElement(card.icon, { sx: { fontSize: "45px" } })}
              </div>
              
              <h3 className="text-xl font-black tracking-tight text-slate-800 uppercase italic mb-4 group-hover:text-indigo-600 transition-colors">
                {card.label}
              </h3>
              
              <div className="px-6 py-2 bg-slate-50 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Portal</span>
              </div>
            </Link>
          ))}
        </div>

        {/* 🔷 SUPPORT FOOTER */}
        <div className="mt-20 p-10 bg-[#0f172a] rounded-[3rem] text-white flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] transition-transform group-hover:scale-150 duration-1000" />
          
          <div className="flex items-center gap-6 relative z-10">
             <div className="p-4 bg-white/5 rounded-2xl border border-white/10 italic font-black text-indigo-400">?</div>
             <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-1">Developer Line</p>
                <p className="text-sm font-medium italic text-slate-400 tracking-tight text-left">System Maintenance & Technical Support</p>
             </div>
          </div>
          
          <a href="tel:+918770191425" className="relative z-10 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-white hover:text-slate-900 transition-all shadow-xl uppercase tracking-widest active:scale-95">
             +91 8770191425
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;