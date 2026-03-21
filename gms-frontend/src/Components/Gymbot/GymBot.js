import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiActivity, FiZap } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:4000" 
    : "https://gys-aniket-gupta.onrender.com";

const GymBot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: '💪 Welcome back to POWER ZONE! Main aapka AI Coach hoon. Workout chart ya Meal plan chahiye? Just ask, let’s crush it!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/gymbot/ask`, { message: userMsg }, { withCredentials: true });
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Server busy. API limits ho sakti hain.";
      setMessages(prev => [...prev, { role: 'bot', text: `⚠️ ${errorMsg}` }]);
      toast.error("Network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-1 h-screen bg-[#f1f5f9] lg:pl-72 w-full transition-all duration-300 relative overflow-hidden'>
      
      {/* 📱💻 Layout Container: Mobile pe full screen, Laptop pe centered */}
      <div className='flex flex-col h-full w-full max-w-5xl mx-auto md:p-6 lg:p-8 relative'>
        
        {/* 🔷 HEADER: Fixed at top */}
        <div className="bg-slate-900 text-white p-4 md:p-6 md:rounded-[2rem] flex items-center justify-between shadow-xl shrink-0 z-20 border-b md:border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px]"></div>
          
          <div className="flex items-center gap-3 md:gap-5 relative z-10">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
              <FiZap size={22} className="text-white md:hidden" />
              <FiZap size={28} className="text-white hidden md:block" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black italic uppercase tracking-widest text-white leading-none">
                AI Coach
              </h1>
              <p className="text-[9px] md:text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Power Zone Active
              </p>
            </div>
          </div>
        </div>

        {/* 🔷 CHAT WINDOW: Auto-scrollable */}
        <div className="flex-1 bg-white md:rounded-[2.5rem] shadow-xl md:my-4 border-x md:border border-slate-200 p-4 md:p-6 overflow-y-auto flex flex-col gap-5 custom-scrollbar relative z-10 pb-20 md:pb-6">
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 md:gap-4 w-full ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar Icon */}
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'user' ? <FiUser size={16}/> : <FiActivity size={16}/>}
              </div>
              
              {/* Message Bubble: Optimized for Tables and Code */}
              <div className={`max-w-[85%] md:max-w-[80%] p-4 md:p-5 rounded-2xl text-[14px] md:text-[15px] font-medium leading-relaxed shadow-sm overflow-x-auto
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-sm'}`}>
                
                {/* 📊 This handles markdown table spacing */}
                <div className="prose prose-sm max-w-full">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4 mr-auto animate-in fade-in">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <FiActivity size={16}/>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 🔷 INPUT FIELD: Sticky at bottom */}
        <div className="fixed md:relative bottom-0 left-0 md:bottom-auto w-full bg-white md:bg-transparent p-3 md:p-0 z-30">
          <div className="bg-white p-1.5 md:p-2.5 rounded-full md:rounded-[2.5rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-2xl border border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              placeholder="Ask for workout chart..." 
              className="flex-1 bg-transparent outline-none pl-5 text-[14px] md:text-[16px] font-medium text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
            />
            <button 
              onClick={handleSend} 
              disabled={loading || !input.trim()} 
              className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-white rounded-full md:rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg active:scale-90"
            >
              <FiSend size={20} className={loading ? 'opacity-0' : 'opacity-100'} />
              {loading && <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            </button>
          </div>
        </div>

      </div>

      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* Table Styling within Bot responses */
        table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 13px; }
        th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
        th { background: #f8fafc; font-weight: 800; text-transform: uppercase; }
      `}</style>
    </div>
  );
};

export default GymBot;