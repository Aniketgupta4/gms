import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    /* 🔷 Backdrop: Glassmorphism effect with subtle blur */
    <div className='fixed inset-0 z-[999] flex justify-center items-center bg-slate-900/40 backdrop-blur-md transition-all duration-500'>
      
      <div className="relative flex flex-col items-center">
        
        {/* Outer Glow Effect */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full"></div>

        <Box className="relative flex items-center justify-center">
          
          {/* Layer 1: Static background ring (Grey) */}
          <CircularProgress
            variant="determinate"
            sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
            size="6rem"
            thickness={4}
            value={100}
          />

          {/* Layer 2: Animated Indigo ring */}
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: '#6366f1', // Indigo-500
              animationDuration: '600ms',
              position: 'absolute',
              left: 0,
              [`& .MuiCircularProgress-circle`]: {
                strokeLinecap: 'round',
              },
            }}
            size="6rem"
            thickness={4}
          />
          
          {/* Inner Brand Initial (Optional: Makes it look customized) */}
          <div className="absolute text-white font-black italic text-xl tracking-tighter opacity-80">
            G
          </div>
        </Box>

        {/* Professional Status Text */}
        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="text-white font-black italic uppercase tracking-[0.3em] text-xs animate-pulse">
            Processing
          </p>
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce"></span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Loader;