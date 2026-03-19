import React from 'react';
import { FiX } from 'react-icons/fi'; // Sleek icons ke liye (npm install react-icons)

const Modal = ({ handleClose, content, header }) => {
  return (
    /* 1. Backdrop: Fixed inset-0 se pura cover hoga, flex + items-center se content hamesha beech mein rahega */
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 overflow-hidden">
      
      {/* 🌫️ Background Blur/Dim */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={handleClose}
      />
      
      {/* 📦 Modal Box: 
          - Mobile: w-full (95% approx due to p-4)
          - Laptop: max-w-2xl
          - Internal Scroll: max-h-[90vh] + flex-col
      */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[2.5rem] shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* 📋 Header Section (Sticky) */}
        <div className="px-6 py-5 md:px-8 border-b border-slate-50 flex justify-between items-center bg-white z-10">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
            {header}
          </h2>
          <button 
            onClick={handleClose} 
            className="p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-all active:scale-90 shadow-sm"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* ↕️ Content Area (Internal Scroll enabled) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {content}
        </div>

      </div>

      {/* Internal CSS for clean sidebar scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
      `}</style>
    </div>
  );
};

export default Modal;