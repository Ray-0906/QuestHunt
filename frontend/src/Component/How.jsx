import React from 'react';
import { IconShieldPlus, IconListDetails, IconChartBar, IconProgress } from '@tabler/icons-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <IconShieldPlus className="h-12 w-12 text-blue-400" />,
      title: "Establish Gate Protocols",
      description: "Forge your personal dungeons - define objectives like 'Vanquish 30 Min Exercise Demons' or 'Decrypt Ancient Tome Scrolls'"
    },
    {
      icon: <IconListDetails className="h-12 w-12 text-purple-400" />,
      title: "Deploy Shadow Army",
      description: "Fragment your conquests into tactical missions - your spectral legion awaits commands"
    },
    {
      icon: <IconChartBar className="h-12 w-12 text-cyan-400" />,
      title: "Harness Monarch's Power",
      description: "Accumulate essence to evolve your stats (Might, Arcana, Agility) through dimensional achievements"
    },
    {
      icon: <IconProgress className="h-12 w-12 text-green-400" />,
      title: "Monitor Dominion Expansion",
      description: "Witness your empire grow through the Monarch's Eye - real-time stat surveillance system"
    }
  ];

  return (
    <div className="relative pt-14 pb-2 bg-[#0a0a15] overflow-hidden border-t border-blue-900/50">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' fill='%2300c6ff' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 uppercase tracking-wider">
            Monarch's Command Protocol
          </h2>
          <p className="text-lg text-blue-400/80 max-w-3xl mx-auto">
            Ascend through the ranks using the Shadow Sovereign's battle-tested hierarchy system
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-1 bg-blue-900/50 transform translate-y-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 w-full h-full animate-progress-line" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step Card */}
              <div className="p-8 bg-black/30 rounded-2xl border-2 border-blue-900/50 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-glow-blue h-full">
                {/* Hologram Effect */}
                <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(130deg,transparent_50%,rgba(0,198,255,0.05)_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="text-center">
                  {/* Animated Icon */}
                  <div className="mb-6 inline-block p-6 bg-black/50 rounded-full border-2 border-blue-900/50 group-hover:border-cyan-400/60 transition-colors">
                    {step.icon}
                  </div>
                  
                  {/* Step Number */}
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-blue-900/30 text-cyan-400 rounded-full text-sm font-bold tracking-widest">
                      PROTOCOL 0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-blue-400 mb-4 tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-blue-400/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Floating Pulse */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* System Footer */}
        <div className="mt-20 text-center border-t border-blue-900/50 pt-12">
          <p className="text-blue-400/70 text-sm uppercase tracking-widest">
            Current Active Hunters: <span className="text-cyan-400">1,402,531</span>
          </p>
          <p className="text-xs text-blue-400/50 mt-2">
            System Version: Monarch's Will v3.2.1 - Authorization Level: S-Rank
          </p>
        </div>
      </div>

      {/* Animations */}
      <style >{`
        @keyframes progress-line {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress-line {
          animation: progress-line 2s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;