import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch, FiPrinter, FiUser, FiCalendar, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';

const BASE_URL = "https://gys-aniket-gupta.onrender.com";

const Billing = () => {
    const [mobile, setMobile] = useState("");
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!mobile) return toast.warning("Enter mobile number");
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/members/search/mobile/${mobile}`, { withCredentials: true });
            setMember(res.data);
            toast.success("Member Found!");
        } catch (err) {
            toast.error("Member not found");
            setMember(null);
        }
        setLoading(false);
    };

    const handlePrint = () => {
        window.print(); // Browser ka print dialog open hoga
    };

    return (
        <div className='min-h-screen bg-[#f8fafc] lg:pl-72 w-full transition-all duration-300'>
            <div className='p-4 md:p-10 w-full max-w-[1200px] mx-auto'>
                
                {/* 🔷 SEARCH BOX */}
                <div className='bg-[#0f172a] p-8 rounded-[2.5rem] shadow-2xl mb-10 border border-slate-800 print:hidden'>
                    <h2 className='text-white font-black uppercase italic tracking-widest mb-6'>Quick Billing Portal</h2>
                    <div className='flex gap-3'>
                        <input 
                            type="text" 
                            placeholder="Enter Member Mobile Number..." 
                            className='flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 text-white outline-none focus:ring-2 focus:ring-indigo-500'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <button 
                            onClick={handleSearch}
                            className='bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all flex items-center gap-2'
                        >
                            <FiSearch /> {loading ? "Searching..." : "Search"}
                        </button>
                    </div>
                </div>

                {/* 🔷 RECEIPT AREA */}
                {member && (
                    <div className='bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl max-w-[600px] mx-auto relative overflow-hidden' id="receipt">
                        {/* Receipt Design */}
                        <div className='text-center mb-8'>
                            <h1 className='text-3xl font-black italic uppercase text-slate-900'>Payment Receipt</h1>
                            <p className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-2'>Elite Gym Management System</p>
                        </div>

                        <div className='space-y-6 border-y border-slate-100 py-8'>
                            <div className='flex justify-between'><span className='text-slate-400 font-bold uppercase text-[10px]'>Member Name</span> <span className='font-black text-slate-900 uppercase italic'>{member.name}</span></div>
                            <div className='flex justify-between'><span className='text-slate-400 font-bold uppercase text-[10px]'>Membership</span> <span className='font-black text-indigo-600 uppercase italic'>{member.membership?.planName || "N/A"}</span></div>
                            <div className='flex justify-between'><span className='text-slate-400 font-bold uppercase text-[10px]'>Amount Paid</span> <span className='font-black text-slate-900'>₹{member.membership?.price || "0"}</span></div>
                            <div className='flex justify-between'><span className='text-slate-400 font-bold uppercase text-[10px]'>Next Renewal</span> <span className='font-black text-rose-500'>{new Date(member.nextRenewalDate).toLocaleDateString()}</span></div>
                        </div>

                        <div className='mt-8 text-center'>
                            <p className='text-[10px] text-slate-400 font-medium italic'>Thank you for being a part of {localStorage.getItem('gymName')}!</p>
                            <button 
                                onClick={handlePrint}
                                className='mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all print:hidden'
                            >
                                <FiPrinter /> Print Receipt
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Print Styling */}
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #receipt, #receipt * { visibility: visible; }
                    #receipt { position: absolute; left: 0; top: 0; width: 100%; border: none; box-shadow: none; }
                    .lg:pl-72 { padding-left: 0 !important; }
                }
            `}</style>
        </div>
    );
};

export default Billing;