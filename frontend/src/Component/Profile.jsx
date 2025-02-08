import React, { useState, useEffect } from "react";
import Avatar from "./avater";
import ProgressBar from "./Progress";
import { getLevelDetails } from "../service/maths";
import { useSelector } from "react-redux";

const StatusCard = () => {
  const data = useSelector((state) => state.auth.userData);

  const [levelData, setLevelData] = useState({
    level: 1,
    currentLevelProgress: 0,
    xpGap: 0,
    progressPercentage: 0,
  });

  useEffect(() => {
    if (data?.profile?.exp) {
      const levelDetails = getLevelDetails(data.profile.exp);
      setLevelData({...levelDetails});
    }
  }, [data?.profile?.exp]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="text-blue-400 text-xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0a0a15]/95 backdrop-blur-sm mx-auto p-8 max-w-2xl rounded-2xl 
      md:border md:border-blue-500/30 shadow-2xl shadow-blue-900/30
      font-mono before:absolute before:inset-0 before:bg-[linear-gradient(130deg,#00f6ff12_35%,#0000_65%)]">
      
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none 
        border border-blue-500/20 shadow-[inset_0_0_20px_rgba(0,198,255,0.1)]" />

      {/* Header */}
      <div className="text-center border-b border-blue-900/50 pb-4 mb-8 relative">
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        <h2 className="text-3xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-400 tracking-widest
          drop-shadow-[0_0_8px_rgba(0,198,255,0.4)] uppercase">
          PLAYER STATUS
        </h2>
      </div>

      {/* Profile Section */}
      <div className="flex justify-center my-3 block md:hidden">
          <Avatar 
            src="/mc.png" 
            size="120px"
            className="border-2 border-blue-600/50 rounded-full 
              shadow-glow-blue hover:border-cyan-400/60 transition-all
              hover:shadow-[0_0_30px_rgba(0,198,255,0.3)]"
          />
        </div>
      <div className="grid grid-cols-4 gap-8 mb-10">
        <div className="col-span-3 space-y-4">
          <div className="flex items-center space-x-4 group">
            <span className="text-blue-400/80 text-lg tracking-wider">⫸ IDENT:</span>
            <p className="text-xl text-blue-200/90 tracking-wide uppercase font-semibold">
              {data.username || "UNKNOWN_ENTITY"}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-blue-400/80 text-lg tracking-wider">⫸ CLASS:</span>
            <p className="text-xl text-blue-200/90 tracking-wide font-semibold">
              {data.profile.job || "ASCENDANT"}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-blue-400/80 text-lg tracking-wider">⫸ TITLE:</span>
            <p className="text-xl text-amber-400/90 tracking-wide font-semibold">
              {data.profile.title || "SHADOW WALKER"}
            </p>
          </div>
        </div>

        <div className="flex justify-end hidden md:block">
          <Avatar 
            src="/mc.png" 
            size="120px"
            className="border-2 border-blue-600/50 rounded-full 
              shadow-glow-blue hover:border-cyan-400/60 transition-all
              hover:shadow-[0_0_30px_rgba(0,198,255,0.3)]"
          />
        </div>
      </div>

      {/* Level Display */}
      <div className="text-center mb-10 relative">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        <p className="text-2xl text-blue-400/80 mb-2 tracking-widest">
          MONARCH LEVEL
        </p>
        <h1 className="text-8xl font-black text-transparent bg-clip-text 
          bg-gradient-to-br from-blue-400 to-cyan-400 
          drop-shadow-[0_0_20px_rgba(0,198,255,0.5)] animate-pulse-slow">
          {levelData.level}
        </h1>
        <p className="text-sm text-blue-400/60 mt-2 tracking-wide">
          {levelData.currentLevelProgress} / {levelData.xpGap} XP TO NEXT ASCENSION
        </p>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-12">
        <ProgressBar 
          exp={data.profile.exp}
          label="ESSENCE ACCUMULATION"
          className="text-blue-400"
          theme="solo-leveling"
        />
      </div>

      {/* Stats Section */}
      <div className="border-t border-blue-900/50 pt-8">
        <h3 className="text-2xl text-center text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-400 to-cyan-400 font-bold mb-8
          drop-shadow-[0_0_8px_rgba(0,198,255,0.4)]">
          ASCENDANT ATTRIBUTES
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(data.profile.stats).map(([statName, value]) => (
            <div key={statName} className="p-4 bg-black/20 rounded-lg 
              border border-blue-900/50 hover:border-blue-600/70 transition-all
              hover:shadow-glow-blue">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-400/80 tracking-wider">
                  ⚔️ {statName.toUpperCase()}
                </span>
                <span className="text-cyan-400/90 font-bold text-xl">
                  {getLevelDetails(value).level}
                </span>
              </div>
              <ProgressBar
                exp={value}
                theme="solo-leveling"
                className="text-xs"
                hideLabel
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
