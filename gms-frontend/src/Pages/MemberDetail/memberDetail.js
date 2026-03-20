import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import Switch from 'react-switch';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FiUser, FiPhone, FiMapPin, FiCalendar, FiClock, FiActivity, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';

const BASE_URL = "https://gys-aniket-gupta.onrender.com";

const MemberDetail = () => {
  const [status, setStatus] = useState("Pending");
  const [renew, setRenew] = useState(false);
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanMember] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔷 Status Change Logic
  const handleSwitchButton = async () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    try {
      await axios.post(`${BASE_URL}/members/change-status/${id}`, { status: statuss }, { withCredentials: true });
      setStatus(statuss);
      toast.success(`Status updated to ${statuss}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // 🔷 Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/members/get-member/${id}`, { withCredentials: true });
        setData(res.data.member);
        setStatus(res.data.member.status);
      } catch (err) {
        toast.error("Member details not found");
      }
    };

    const fetchMembershipPlans = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/plans/get-membership`, { withCredentials: true });
        setMembership(res.data.membership);
        if (res.data.membership.length > 0) setPlanMember(res.data.membership[0]._id);
      } catch (err) {
        toast.error("Error loading plans");
      }
    };

    fetchData();
    fetchMembershipPlans();
  }, [id]);

  // 🔷 Date Logic
  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return date.slice(0, 10).split('-').reverse().join('-');
  };

  // 🔷 🚀 RENEW & REDIRECT LOGIC
  const handleRenewSaveBtn = async () => {
    setIsUpdating(true);
    try {
      await axios.put(
        `${BASE_URL}/members/update-member-plan/${id}`, 
        { membership: planMember }, 
        { withCredentials: true }
      );

      toast.success("Membership Renewed Successfully! Redirecting...");

      // 1.5 Second delay for UX, then redirect to Members List
      setTimeout(() => {
        navigate('/member'); 
      }, 1500);

    } catch (err) {
      toast.error("Renewal failed. Check server connection.");
      setIsUpdating(false);
    }
  };

  return (
    <div className='flex-1 min-h-screen bg-[#f8fafc] p-6 lg:p-10 transition-all duration-300'>
      
      {/* 🔷 HEADER NAVIGATION */}
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className='flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black italic text-xs hover:bg-indigo-600 transition-all shadow-xl active:scale-95'
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} /> GO BACK
        </button>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Database ID</p>
          <p className="text-xs font-mono font-bold text-indigo-600 uppercase">GMS-{id.slice(-6)}</p>
        </div>
      </div>

      {/* 🔷 PROFILE CARD CONTAINER */}
      <div className='max-w-6xl mx-auto bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700'>
        <div className='flex flex-col lg:flex-row'>
          
          {/* LEFT: Image & Status Toggle */}
          <div className='lg:w-1/3 bg-slate-50 p-10 flex flex-col items-center border-r border-slate-100'>
            <div className='relative w-48 h-48 md:w-60 md:h-60 mb-10'>
              <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
              <img 
                src={data?.profilePic} 
                className='relative w-full h-full object-cover rounded-[3rem] border-4 border-white shadow-2xl transition-transform hover:scale-105 duration-500' 
                alt="Member"
              />
            </div>
            
            <div className='w-full bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4'>
              <div className="flex justify-between items-center">
                 <span className='text-[10px] font-black uppercase tracking-widest text-slate-400'>Access State</span>
                 <Switch 
                   onColor='#6366F1' 
                   height={22} 
                   width={46} 
                   handleDiameter={18} 
                   checked={status === "Active"} 
                   onChange={handleSwitchButton} 
                 />
              </div>
              <div className={`text-center py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${status === "Active" ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                System Status: {status}
              </div>
            </div>
          </div>

          {/* RIGHT: Member Information Grid */}
          <div className='lg:w-2/3 p-10 lg:p-16 text-left'>
            <div className="mb-12">
               <h1 className='text-5xl font-black italic tracking-tighter uppercase text-slate-900 leading-none'>{data?.name}</h1>
               <p className="text-indigo-600 font-bold text-xs tracking-[0.4em] uppercase mt-3">Verified Gym Member</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-12'>
              <InfoItem icon={<FiPhone />} label="Mobile Contact" value={`+91 ${data?.mobileNo}`} />
              <InfoItem icon={<FiCalendar />} label="Joining Date" value={formatDate(data?.createdAt)} />
              <InfoItem icon={<FiMapPin />} label="Residential Address" value={data?.address || "Street Not Provided"} />
              <InfoItem 
                icon={<FiClock />} 
                label="Billing Due Date" 
                value={formatDate(data?.nextBillDate)} 
                alert={isDateInPast(data?.nextBillDate)}
              />
            </div>

            {/* 🔷 RENEW SECTION (Only if Expired) */}
            {isDateInPast(data?.nextBillDate) && (
              <div className="animate-in slide-in-from-top-4 duration-500">
                {!renew ? (
                  <button 
                    onClick={() => setRenew(true)} 
                    className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black italic tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl active:scale-95"
                  >
                    <FiRefreshCw className="animate-spin-slow" /> INITIALIZE RENEWAL
                  </button>
                ) : (
                  <div className='bg-[#0f172a] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group'>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <FiActivity className="text-indigo-400" />
                        <span className="font-black italic uppercase tracking-widest text-sm text-indigo-400">System Upgrade Flow</span>
                      </div>
                      <div className='space-y-6'>
                        <div className="space-y-2">
                           <label className='text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1'>Select Migration Plan</label>
                           <select 
                             value={planMember} 
                             onChange={(e) => setPlanMember(e.target.value)} 
                             className='w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer italic'
                           >
                             {membership.map((item, index) => (
                               <option key={index} value={item._id} className="text-slate-900">
                                 {item.months} Month Premium Tier
                               </option>
                             ))}
                           </select>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                           <button 
                             onClick={() => setRenew(false)} 
                             className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase hover:bg-white/10 transition"
                           >
                             Discard
                           </button>
                           <button 
                             onClick={handleRenewSaveBtn} 
                             disabled={isUpdating}
                             className='flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-white hover:text-slate-900 shadow-xl transition flex items-center justify-center gap-2'
                           >
                             {isUpdating ? "Processing..." : <>Confirm & Save <FiCheckCircle /></>}
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

// 🔷 Sub-Component for Clean Grid Items
const InfoItem = ({ icon, label, value, alert }) => (
  <div className="flex items-start gap-5">
     <div className={`p-4 rounded-2xl shadow-sm ${alert ? 'bg-rose-50 text-rose-500 shadow-rose-100' : 'bg-indigo-50 text-indigo-600 shadow-indigo-100'}`}>
        {icon}
     </div>
     <div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
        <p className={`text-xl font-bold italic tracking-tight ${alert ? 'text-rose-600' : 'text-slate-700'}`}>{value}</p>
     </div>
  </div>
);

export default MemberDetail;