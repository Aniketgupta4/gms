import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiCpu, FiMessageCircle } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

// ✅ Dynamic URL taaki Local aur Render dono pe chale
const BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:4000" 
    : "https://gys-aniket-gupta.onrender.com";

const GymBot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      text: 'Hello Aniket! Main Elite GymBot hoon. Workout plans, diet tips, ya gym management ke baare mein kuch bhi poocho!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🖱️ Auto-scroll to bottom jab naya message aaye
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 Send Message Logic
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    // 1. User ka message turant UI pe dikhao
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // 2. Apne backend ko call karo (Direct Gemini nahi)
      const res = await axios.post(`${BASE_URL}/api/gymbot/ask`, { 
        message: userMsg 
      }, { withCredentials: true });
      
      // 3. Bot ka reply UI pe dikhao
      setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);

    } catch (err) {
      // 🛡️ API exhaust ya network fail hone par safe fallback
      const errorMsg = err.response?.data?.error || "Connection error. Main thoda rest kar raha hoon, baad mein try karo!";
      setMessages(prev => [...prev, { role: 'bot', text: `⚠️ ${errorMsg}` }]);
      toast.error("GymBot network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🛠️ lg:pl-72 ensures sidebar overlap nahi karega
    <div className='flex-1 min-h-screen bg-[#f8fafc] lg:pl-72 w-full transition-all duration-300 relative'>
      
      <div className='p-4 md:p-8 w-full max-w-4xl mx-auto flex flex-col h-screen pb-6'>
        
        {/* 🔷 HEADER */}
        <div className="bg-[#0f172a] text-white p-6 rounded-[2rem] flex items-center justify-between shadow-2xl shrink-0 mt-4 md:mt-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FiCpu size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-widest leading-none">Elite GymBot</h1>
              <p className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">AI Fitness Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest">Online</span>
          </div>
        </div>

        {/* 🔷 CHAT WINDOW */}
        <div className="flex-1 bg-white/50 backdrop-blur-md rounded-[2.5rem] shadow-sm border border-slate-200 p-6 overflow-y-auto mt-6 mb-6 flex flex-col gap-6 custom-scrollbar">
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'user' ? <FiUser size={16}/> : <FiCpu size={16}/>}
              </div>
              
              {/* Message Bubble */}
              <div className={`p-4 md:p-5 rounded-2xl text-sm md:text-base font-medium whitespace-pre-wrap leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* 🔷 LOADING ANIMATION */}
          {loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto animate-in fade-in duration-300">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-md">
                <FiCpu size={16}/>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-slate-100 rounded-tl-sm shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 🔷 INPUT FIELD */}
        <div className="bg-white p-3 rounded-[2rem] shadow-lg border border-slate-200 flex items-center gap-3 shrink-0 relative z-10">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            placeholder="Ask about diet, workouts, or gym tools..." 
            className="flex-1 bg-transparent outline-none pl-4 text-sm md:text-base font-medium text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()} 
            className="w-12 h-12 md:w-14 md:h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-md disabled:opacity-50 active:scale-95"
          >
            <FiSend size={20} className={loading ? 'opacity-0' : 'opacity-100 transition-opacity'} />
            {loading && <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          </button>
        </div>

      </div>

      <ToastContainer theme="dark" position="top-right" />
      
      {/* 🛠️ Hide scrollbar for cleaner look */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default GymBot;