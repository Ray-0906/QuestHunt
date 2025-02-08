import React from 'react';
import { IconDoorEnter, IconSword, IconProgress } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router';

const EmptyQuests = () => {
    const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-[#0a0a15] flex items-center justify-center p-8 overflow-hidden">
      {/* Animated Portal Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full animate-portal-pulse" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-portal-rotate" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* System Header */}
        <div className="mb-8 border-b border-blue-900/50 pb-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 uppercase tracking-wider">
            Gate System: Idle
          </h1>
          <p className="text-blue-400/80">Current Dimension: Human Realm</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-12">
          <IconDoorEnter className="h-24 w-24 text-cyan-400 mx-auto animate-bounce-slow" />
          
          <h2 className="text-3xl text-blue-200 font-bold uppercase tracking-wide">
            No Active Gates Detected
          </h2>
          
          <p className="text-blue-400/80 text-lg leading-relaxed max-w-xl mx-auto">
            The path to ascension awaits. Initiate a new dimensional gate to commence your journey as 
            <span className="text-cyan-400 ml-2">The Monarch's Vessel</span>
          </p>
        </div>

        {/* CTA Button */}
        <button onClick={(e)=>{ e.preventDefault();
             navigate('/add-mission')}} className="group relative px-12 py-6 bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 text-2xl font-black uppercase tracking-widest rounded-2xl shadow-glow-blue-lg transition-all duration-300 mb-8">
          <span className="relative z-10 flex items-center gap-4">
            <IconSword className="h-8 w-8 text-amber-400" />
            Initialize Gate Protocol
            <IconProgress className="h-8 w-8 ml-2 transition-transform group-hover:rotate-90" />
          </span>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,198,255,0.1)_50%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[length:400%_400%] animate-shine" />
        </button>

        {/* Secondary Options */}
        <div className="text-blue-400/80 space-y-4">
          <p className="text-sm">Or assess previous conquests</p>
          <button className="px-6 py-3 border-2 border-blue-900/50 hover:border-cyan-400/60 rounded-xl transition-all hover:text-cyan-400">
            Browse Completed Gates
          </button>
        </div>

        {/* System Status */}
        <div className="mt-12 pt-8 border-t border-blue-900/50">
          <div className="flex justify-center gap-8 text-sm text-blue-400/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Gate System: Operational</span>
            </div>
            <span>•</span>
            <span>Available Mana: ∞</span>
            <span>•</span>
            <span>Season: Monarch's Trial</span>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}

      {/* Animations */}
      <style >{`
        @keyframes portal-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes portal-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-portal-pulse {
          animation: portal-pulse 3s ease-in-out infinite;
        }
        .animate-portal-rotate {
          animation: portal-rotate 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EmptyQuests;