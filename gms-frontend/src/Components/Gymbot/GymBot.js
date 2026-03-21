import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiActivity, FiZap } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

// ✅ Dynamic URL
const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:4000" 
    : "https://gys-aniket-gupta.onrender.com";

const GymBot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: '💪 Welcome to POWER ZONE! Main aapka AI Fitness Coach hoon. Diet, Workout Split, ya Gym Management se related kuch bhi poocho. Let’s crush your goals!' 
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
      const res = await axios.post(`${BASE_URL}/api/gymbot/ask`, { 
        message: userMsg 
      }, { withCredentials: true });
      
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);

    } catch (err) {
      const errorMsg = err.response?.data?.error || "Server offline hai bhai! Thoda rest lene do AI ko.";
      setMessages(prev => [...prev, { role: 'bot', text: `⚠️ ${errorMsg}` }]);
      toast.error("GymBot network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-1 min-h-screen bg-[#f1f5f9] lg:pl-72 w-full transition-all duration-300 relative'>
      
      <div className='p-4 md:p-8 w-full max-w-5xl mx-auto flex flex-col h-screen pb-6'>
        
        {/* 🔷 PREMIUM HEADER */}
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex items-center justify-between shadow-2xl shrink-0 z-10 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <FiZap size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-none">
                AI Coach
              </h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                System Online
              </p>
            </div>
          </div>
        </div>

        {/* 🔷 CHAT WINDOW */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-6 overflow-y-auto mt-6 mb-6 flex flex-col gap-6 custom-scrollbar relative">
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 max-w-[85%] md:max-w-[70%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'user' ? <FiUser size={18}/> : <FiActivity size={18}/>}
              </div>
              
              {/* Message */}
              <div className={`p-5 rounded-[1.5rem] text-[15px] font-medium whitespace-pre-wrap leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="flex gap-4 max-w-[80%] mr-auto animate-in fade-in">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                <FiActivity size={18}/>
              </div>
              <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 rounded-tl-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 🔷 INPUT FIELD */}
        <div className="bg-white p-2.5 rounded-[2rem] shadow-xl border border-slate-200 flex items-center gap-3 shrink-0">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder="Type your fitness query here..." 
            className="flex-1 bg-transparent outline-none pl-5 text-[15px] font-medium text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()} 
            className="w-14 h-14 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg disabled:opacity-50 active:scale-95 relative"
          >
            <FiSend size={22} className={loading ? 'opacity-0' : 'opacity-100 transition-opacity translate-x-[-2px] translate-y-[2px]'} />
            {loading && <div className="absolute w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          </button>
        </div>

      </div>
      <ToastContainer theme="dark" position="top-right" />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default GymBot;