import React, { useState, useEffect } from 'react';

const QuestRewardPopup = ({ exp, trigger }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* Main Reward Card */}
      <div className="animate-scaleUp origin-center">
        <div className="   p-8 shadow-glow-blue-lg relative overflow-hidden">
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '0%',
                animationDelay: `${i * 0.2}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
          
          {/* EXP Text */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-6xl font-black text-amber-400 animate-pulse-slow">+{exp}</span>
              <span className="text-4xl font-bold text-blue-400">EXP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Style Definitions */}
      <style >{`
        @keyframes scaleUp {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          80% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }

        .animate-scaleUp {
          animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-float {
          animation: float 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default QuestRewardPopup;