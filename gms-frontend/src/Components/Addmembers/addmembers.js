import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
// npm install react-icons
import { 
  FiUser, FiPhone, FiMapPin, FiCalendar, 
  FiCreditCard, FiUploadCloud, FiLoader, FiCheckCircle, FiArrowRight 
} from 'react-icons/fi';

const Addmembers = () => {
  const [inputField, setInputField] = useState({
    name: "", 
    mobileNo: "", 
    address: "", 
    membership: "", 
    profilePic: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80", 
    joiningDate: ""
  });
  
  const [imageLoader, setImageLoader] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = "https://gys-aniket-gupta.onrender.com";

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (!files[0]) return;
    
    setImageLoader(true);
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gym-management');
    
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dpyeiobze/image/upload', data);
      const imageUrl = response.data.url;
      setInputField({ ...inputField, profilePic: imageUrl });
      toast.info("Profile photo updated");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setImageLoader(false);
    }
  }

  const fetchMemberShip = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plans/get-membership`, { withCredentials: true });
      setMembershipList(res.data.membership);
      if (res.data.membership.length > 0) {
        let firstPlan = res.data.membership[0]._id;
        setSelectedOption(firstPlan);
        setInputField(prev => ({ ...prev, membership: firstPlan }));
      }
    } catch (err) {
      toast.error("Error fetching plans");
    }
  }

  useEffect(() => {
    fetchMemberShip();
  }, [])

  const handleRegisterButton = async () => {
    if (!inputField.name || !inputField.mobileNo) {
      return toast.warning("Name & Mobile are required!");
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/members/register-member`, inputField, { withCredentials: true });
      toast.success("Member Registered Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] flex flex-col max-h-[85vh] overflow-hidden'>
      
      {/* 📋 Scrollable Body Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
        
        <div className='flex flex-col lg:flex-row gap-10 items-start'>
          
          {/* 📷 Identity Photo Section */}
          <div className="w-full lg:w-1/3 flex flex-col items-center p-6 bg-slate-50 rounded-[3rem] border border-slate-100 border-dashed">
            <div className='relative w-32 h-32 md:w-40 md:h-40 group'>
              <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={inputField.profilePic} 
                className={`w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-2xl transition-all duration-500 ${imageLoader ? 'blur-sm grayscale' : 'scale-100'}`} 
                alt="Member"
              />
              {imageLoader && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <FiLoader className="animate-spin text-indigo-600 text-3xl" />
                 </div>
              )}
              <label className='absolute -bottom-2 -right-2 bg-slate-900 text-white p-3.5 rounded-2xl cursor-pointer hover:bg-indigo-600 transition-all shadow-xl active:scale-90'>
                <FiUploadCloud size={20} />
                <input type='file' onChange={uploadImage} className='hidden' accept="image/*" />
              </label>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6 text-center italic">Identity Capture</p>
          </div>

          {/* 📝 Form Details Grid */}
          <div className='w-full lg:w-2/3 grid gap-6 grid-cols-1 md:grid-cols-2'>
            
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Joinee Name</label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input value={inputField.name} onChange={(e) => handleOnChange(e, "name")} type='text' className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium' placeholder='Full Name'/>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Contact</label>
              <div className="relative group">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input value={inputField.mobileNo} onChange={(e) => handleOnChange(e, "mobileNo")} type='number' className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium' placeholder='Mobile Number'/>
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Member Address</label>
              <div className="relative group">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input value={inputField.address} onChange={(e) => handleOnChange(e, "address")} type='text' className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium' placeholder='Street, City, Zip Code'/>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Joining Date</label>
              <div className="relative group">
                <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input value={inputField.joiningDate} onChange={(e) => handleOnChange(e, "joiningDate")} type='date' className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-medium'/>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Active Tier Plan</label>
              <div className="relative group">
                <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <select value={selectedOption} onChange={(e) => {setSelectedOption(e.target.value); setInputField({...inputField, membership: e.target.value})}} className='w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer italic'>
                  {membershipList.map((item, index) => (
                    <option key={index} value={item._id}>{item.months} Month Subscription</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Sticky Bottom Action Button */}
      <div className="p-4 md:p-8 border-t border-slate-50 bg-white flex justify-center md:justify-end">
        <button 
          onClick={handleRegisterButton} 
          disabled={isSubmitting || imageLoader}
          className='w-full md:w-auto px-12 py-5 bg-slate-900 text-white font-black italic tracking-tighter rounded-2xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50'
        >
          {isSubmitting ? <FiLoader className="animate-spin" /> : <>FINALIZE REGISTRATION <FiArrowRight /></>}
        </button>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />

      {/* Internal CSS for clean scrollbar inside modal */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `}</style>
    </div>
  )
}

export default Addmembers;