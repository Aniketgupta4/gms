import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/MemberCard/memberCard';
import { getMonthlyJoined, threeDayExpire, expired, fourToSevenDaysExpire, inActiveMembers } from './data';
import { FiUsers, FiArrowLeft, FiFilter } from 'react-icons/fi'; // Sleek icons

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
  }, [])

  const functionCall = async (func) => {
    setLoading(true);
    let datas;
    switch (func) {
      case "monthlyJoined":
        setHeader("Monthly Joined Members");
        datas = await getMonthlyJoined();
        break;
      case "threeDayExpire":
        setHeader("Expiring within 3 days");
        datas = await threeDayExpire();
        break;
      case "fourToSevenDayExpire":
        setHeader("Expiring within 4-7 days");
        datas = await fourToSevenDaysExpire();
        break;
      case "expired":
        setHeader("Expired Members");
        datas = await expired();
        break;
      case "inactiveMembers":
        setHeader("InActive Members");
        datas = await inActiveMembers();
        break;
      default:
        setHeader("Member Directory");
    }
    if (datas) setData(datas.members);
    setLoading(false);
  }

  return (
    /* 🔷 Offset for Sidebar (lg:ml-72) and Responsive Padding */
    <div className='flex-1 min-h-screen bg-[#f8fafc] lg:ml-72 p-4 md:p-10 transition-all duration-300'>
      
      {/* 🔷 TOP NAVIGATION BAR */}
      <div className='bg-[#0f172a] flex items-center justify-between w-full text-white rounded-[2rem] p-4 md:p-6 shadow-2xl mb-10 border border-slate-800 relative overflow-hidden group'>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <Link 
          to={'/dashboard'} 
          className='relative z-10 flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl font-black italic text-[10px] tracking-widest uppercase hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-lg'
        >
          <FiArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="hidden md:flex items-center gap-3 relative z-10">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Directory View</p>
              <p className="text-xs font-bold text-indigo-400 italic mt-0.5">Live Database Access</p>
           </div>
           <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <FiUsers className="text-indigo-400" />
           </div>
        </div>
      </div>

      {/* 🔷 SECTION HEADER */}
      <div className='mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4'>
        <div>
          <h1 className='text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none'>
            {header || "Loading..."}
          </h1>
          <div className="h-1.5 w-24 bg-indigo-600 mt-4 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <FiFilter className="text-indigo-600" /> Total Records: <span className="text-slate-900 text-sm font-black">{data.length}</span>
        </div>
      </div>

      {/* 🔷 MEMBER DIRECTORY GRID */}
      <div className={`bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[3rem] border border-slate-100 min-h-[500px] transition-all`}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
             <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Data...</p>
          </div>
        ) : (
          <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                  <MemberCard item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50">
                 <p className="text-xl font-black italic uppercase text-slate-400 tracking-tighter">No members found in this category</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        /* Scrollbar styling for a clean look */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>

    </div>
  )
}

export default GeneralUser;