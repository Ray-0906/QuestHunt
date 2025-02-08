import React from 'react';
import { IconSword, IconArrowRight } from '@tabler/icons-react';
import Avatar from './avater';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-[#0a0a15] overflow-hidden border-b border-blue-900/50">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img 
          src="/jinwoo.png"
          alt="dimensional rift"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a15] via-[#0a0a15]/90 to-[#0a0a15]/70" />
      
      {/* Content Container */}
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div className="overflow-hidden">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400 mb-2 md:mb-4 translate-y-[100%] animate-slide-in">
                SYSTEM INITIALIZED
              </h1>
            </div>

            <p className="text-base md:text-xl text-blue-400/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <span className="text-cyan-400 font-medium">Warning:</span> The Monarch's Shadow 
              has awoken. Reforge your destiny through endless dungeon conquests and 
              claim your place in the hunter hierarchy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-700/80 to-cyan-700/80 hover:from-blue-600 hover:to-cyan-600 text-sm md:text-lg font-semibold uppercase tracking-widest rounded-lg transition-all duration-300 border-2 border-cyan-400/30 hover:border-cyan-400/60">
                <span className="flex items-center gap-2 md:gap-3 relative z-10">
                  <IconSword className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
                  Begin Ascension
                  <IconArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-[length:300%_300%] animate-shine opacity-0 group-hover:opacity-30 transition-opacity" />
              </button>
            </div>

            {/* System Status */}
            <div className="mt-8 md:mt-12 grid grid-cols-3 gap-1 md:gap-2 text-xs md:text-sm">
              <div className="p-2 md:p-3 bg-black/30 border border-blue-900/50 rounded-lg">
                <div className="text-cyan-400 font-mono">S-RANK</div>
                <div className="text-blue-400/60">THREAT</div>
              </div>
              <div className="p-2 md:p-3 bg-black/30 border border-blue-900/50 rounded-lg">
                <div className="text-purple-400 font-mono">∞ MP</div>
                <div className="text-blue-400/60">MANA</div>
              </div>
              <div className="p-2 md:p-3 bg-black/30 border border-blue-900/50 rounded-lg">
                <div className="text-green-400 font-mono">ONLINE</div>
                <div className="text-blue-400/60">STATUS</div>
              </div>
            </div>
          </div>

          {/* Character Showcase - Hidden on mobile */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-3xl animate-glow-pulse" />
              <div className="relative isolate">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/10 rounded-2xl blur-xl animate-glow-rotate" />
                <img 
                  src="/jinwoo.png"
                  alt="Shadow Monarch"
                  className="relative hidden md:block z-10 w-full h-auto transition-transform duration-300 scale-[1.05]"
                />
              </div>
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Character Image */}
      <div className="hidden relative w-full -mt-16 pb-16 px-4">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl animate-glow-pulse" />
          <img 
            src="/jinwoo.png"
            alt="Shadow Monarch"
            className="relative z-10 w-full h-auto"
          />
        </div>
      </div>

      <style >{`
        @keyframes slide-in {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes glow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(5px); }
          50% { transform: translateY(10px) translateX(-5px); }
          75% { transform: translateY(-10px) translateX(3px); }
        }
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-slide-in {
          animation: slide-in 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        .animate-glow-rotate {
          animation: glow-rotate 20s linear infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-shine {
          animation: shine 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;