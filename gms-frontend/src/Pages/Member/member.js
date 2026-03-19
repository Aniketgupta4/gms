import React, { useState, useEffect } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from "react-router-dom";
import MemberCard from '../../Components/MemberCard/memberCard';
import Modal from '../../Components/Modal/modal';
import Addmembership from '../../Components/Addmembership/addmembership';
import Addmembers from '../../Components/Addmembers/addmembers';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BASE_URL = "https://gms-1-t3u4.onrender.com";

const Member = () => {
  const [addMembership, setAddmembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit] = useState(9);
  const [noOfPages, setNoOfPages] = useState(0);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limits) => {
    try {
      const res = await axios.get(`${BASE_URL}/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true });
      let totalData = res.data.totalMember;
      setTotalData(totalData);
      setData(res.data.members);

      let totalPage = Math.ceil(totalData / limit);
      setNoOfPages(totalPage);

      if (totalData === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else {
        setStartFrom(skip);
        setEndTo(Math.min(skip + limits, totalData));
      }
    } catch (err) {
      toast.error("Failed to load members");
    }
  }

  const handlePrev = () => {
    if (currentPage !== 1) {
      let skipVal = skip - 9;
      setSkip(skipVal);
      setCurrentPage(currentPage - 1);
      fetchData(skipVal, 9);
    }
  }

  const handleNext = () => {
    if (currentPage !== noOfPages) {
      let skipVal = skip + 9;
      setSkip(skipVal);
      setCurrentPage(currentPage + 1);
      fetchData(skipVal, 9);
    }
  }

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      try {
        const res = await axios.get(`${BASE_URL}/members/searched-members?searchTerm=${search}`, { withCredentials: true });
        setData(res.data.members);
        setTotalData(res.data.totalMembers);
      } catch (err) {
        toast.error("Search failed");
      }
    } else if (isSearchModeOn) {
      window.location.reload();
    } else {
      toast.warning("Please enter a name or number");
    }
  }

  return (
    <div className='flex-1 min-h-screen bg-[#f8fafc] p-6 lg:p-10 relative overflow-y-auto'>
      
      {/* 🔷 TOP ACTION BAR */}
      <div className='w-full bg-[#0f172a] shadow-xl rounded-[2rem] mb-10 overflow-hidden border border-slate-800 p-4 lg:p-6'>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <Link to='/dashboard' className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all">
                <ArrowBackIcon fontSize="small" />
             </Link>
             <div>
                <h2 className="text-white font-black italic uppercase tracking-widest leading-none">Member Directory</h2>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mt-1">Management Portal</p>
             </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setAddMember(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              <FitnessCenterIcon fontSize="small"/> Add Member
            </button>
            <button 
              onClick={() => setAddmembership(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all active:scale-95"
            >
              <AddIcon fontSize="small"/> New Plan
            </button>
          </div>
        </div>
      </div>

      {/* 🔷 SEARCH & PAGINATION BAR */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
        <div className="w-full lg:w-1/2 flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
           <input 
              type='text' 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className='flex-1 pl-4 bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-300' 
              placeholder='Search by name or phone...'
           />
           <button 
              onClick={handleSearchData}
              className='bg-slate-900 text-white p-3 rounded-xl hover:bg-indigo-600 transition-colors shadow-lg'
           >
              <SearchIcon />
           </button>
        </div>

        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Record</p>
              <p className="text-sm font-bold text-slate-700 italic">
                {isSearchModeOn ? `Found ${totalData} Results` : `${startFrom + 1} - ${endTo} of ${totalData} Members`}
              </p>
           </div>

           {!isSearchModeOn && (
              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentPage === 1 ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm active:scale-90'}`}
                >
                  <ChevronLeftIcon />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentPage === noOfPages}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentPage === noOfPages ? 'bg-slate-50 text-slate-300 border-slate-100' : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 shadow-sm active:scale-90'}`}
                >
                  <ChevronRightIcon />
                </button>
              </div>
           )}
        </div>
      </div>

      {/* 🔷 MEMBERS GRID */}
      <div className='bg-white/50 p-6 rounded-[3rem] border border-slate-100 min-h-[500px]'>
         {data.length > 0 ? (
           <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'>
              {data.map((item, index) => (
                <MemberCard key={index} item={item}/>
              ))}
           </div>
         ) : (
           <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 italic">
              <FitnessCenterIcon sx={{ fontSize: 60, opacity: 0.1, mb: 2 }} />
              <p>No members found in the records.</p>
           </div>
         )}
      </div>

      {/* MODALS */}
      {addMembership && <Modal header="Strategic Plan Manager" handleClose={() => setAddmembership(false)} content={<Addmembership handleClose={() => setAddmembership(false)}/>}/>}
      {addMember && <Modal header="Onboard New Member" handleClose={() => setAddMember(false)} content={<Addmembers/>}/>}

      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  )
}

export default Member;