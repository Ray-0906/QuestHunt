import React from 'react';
import { IconSwords, IconShield, IconDeviceTabletStar, IconChartDots } from '@tabler/icons-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <IconSwords className="h-8 w-8 text-cyan-400" />,
      title: "Gate System",
      description: "Conquer dynamically generated dungeons with escalating difficulty levels and rare loot drops"
    },
    {
      icon: <IconShield className="h-8 w-8 text-blue-400" />,
      title: "Shadow Monarch's Blessing",
      description: "Unlock unique buffs and abilities as you progress through the monarch's trials"
    },
    {
      icon: <IconDeviceTabletStar className="h-8 w-8 text-purple-400" />,
      title: "Hunter Rankings",
      description: "Compete in global leaderboards and earn exclusive titles from the Hunter Association"
    },
    {
      icon: <IconChartDots className="h-8 w-8 text-green-400" />,
      title: "Stat Evolution",
      description: "Witness your power grow with our RPG-style progression system and skill trees"
    }
  ];

  return (
    <div className="relative py-24 bg-[#0a0a15] overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 198, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 198, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-blue-400 rounded-full animate-float" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 uppercase tracking-wider">
            Hunter System Features
          </h2>
          <p className="text-lg text-blue-400/80 max-w-2xl mx-auto">
            Harness the power of the Shadow Monarch's legacy with our cutting-edge hunter enhancement system
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-6 bg-black/30 rounded-xl border-2 border-blue-900/50 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-glow-blue">
              {/* Holographic Effect */}
              <div className="absolute inset-0 rounded-xl bg-[linear-gradient(130deg,transparent_50%,rgba(0,198,255,0.05)_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Feature Content */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-black/50 rounded-lg border border-blue-900/50 group-hover:border-cyan-400/60 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-blue-400/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner Glow */}
              <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* System Message */}
        <div className="mt-16 text-center border-t border-blue-900/50 pt-12">
          <p className="text-blue-400/70 text-sm uppercase tracking-widest">
            Current System Status: <span className="text-green-400">Operational</span>
          </p>
          <p className="text-xs text-blue-400/50 mt-2">
            {new Date().toLocaleDateString()} - Shadow Monarch Protocol v2.1.4
          </p>
        </div>
      </div>

      {/* Animations */}
      <style >{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) scale(0.8); opacity: 0.5; }
          100% { transform: translateY(-40px) scale(0.6); opacity: 0; }
        }
        .animate-float {
          animation: float 6s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;