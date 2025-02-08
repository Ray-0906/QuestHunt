import React from 'react';

const SoloLoading = () => {
  return (
    <div className="fixed inset-0 bg-[#0a0a15]/95 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Main Spinner */}
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Animated Ring */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-cyan-400 border-transparent rounded-full animate-spin">
            <div className="absolute -top-[2px] left-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px] shadow-cyan-400"></div>
          </div>
          
          {/* Center Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-text-pulse">
            SYSTEM INITIALIZING
          </h2>
          <p className="text-sm text-blue-400/80 font-mono tracking-widest">
            Loading Monarch Protocols...
          </p>
        </div>
      </div>

      {/* Animations */}
      <style >{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(0.8); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-spin {
          animation: spin 1.5s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-text-pulse {
          animation: text-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SoloLoading;