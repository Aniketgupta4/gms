import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FiPrinter } from 'react-icons/fi'; // Naya icon billing ke liye
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning 🌞");
    else if (currentHour < 18) setGreeting("Good Afternoon ☀️");
    else if (currentHour < 21) setGreeting("Good Evening 🌆");
    else setGreeting("Good Night 🌙");
  };

  useEffect(() => {
    greetingMessage();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <HomeIcon /> },
    { name: "Members", path: "/member", icon: <GroupIcon /> }
  ];

  return (
    <>
      {/* 📱 MOBILE HAMBURGER - Floating */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-900 text-white rounded-lg shadow-lg active:scale-95 transition-all border border-slate-700"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* 🔷 SIDEBAR CONTAINER - Fixed for all screens to prevent layout shifting */}
      <div className={`
        fixed inset-y-0 left-0 z-50 
        w-72 bg-[#0f172a] text-slate-300 
        transform transition-transform duration-300 ease-in-out
        border-r border-slate-800 shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 
      `}>
        
        <div className="h-full flex flex-col p-6">
          
          {/* GYM LOGO & NAME */}
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-black tracking-tighter text-white italic uppercase">
              {localStorage.getItem('gymName') || "POWER ZONE"}
            </h1>
            <div className="h-1 w-12 bg-indigo-600 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* ADMIN PROFILE CARD */}
          <div className="bg-slate-800/50 p-4 rounded-2xl mb-10 flex items-center gap-4 border border-slate-700/50">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-500/20 shrink-0">
              <img 
                alt="gym" 
                className="w-full h-full object-cover" 
                src={localStorage.getItem('gymPic') || "https://i.pravatar.cc/150"}
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 leading-none mb-1">Admin Panel</p>
              <h2 className="text-xs font-bold text-white truncate">{greeting}</h2>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300
                    ${isActive 
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-900/40" 
                      : "hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <span className={`${isActive ? "text-white" : "text-slate-500"}`}>{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT BUTTON - Bottom */}
          <div className="pt-6 border-t border-slate-800 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all active:scale-95"
            >
              <LogoutIcon />
              Logout Session
            </button>
          </div>

        </div>
      </div>

      {/* 🌑 MOBILE OVERLAY - Click to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default Sidebar;