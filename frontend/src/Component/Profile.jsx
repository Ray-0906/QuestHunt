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
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black mx-auto shadow-2xl text-white p-6 max-w-md md:max-w-lg lg:max-w-xl rounded-xl border border-blue-500">
      {/* Header */}
      <div className="text-center border-b border-blue-500 pb-4 mb-6">
        <h2 className="text-3xl font-bold tracking-wide text-blue-400">STATUS WINDOW</h2>
      </div>

      {/* User Info Section */}
      <div className="profile-container grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mb-6">
        <div className="sm:col-span-2 space-y-2">
          <p className="text-lg text-gray-300">
            <strong className="text-blue-400">NAME:</strong> {data.username || "Unknown"}
          </p>
          <p className="text-lg text-gray-300">
            <strong className="text-blue-400">JOB:</strong> {data.profile.job || "Unemployed"}
          </p>
          <p className="text-lg text-gray-300">
            <strong className="text-blue-400">TITLE:</strong> {data.profile.title || "None"}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Avatar src="/mc.png" size="80px" className="border border-blue-500 rounded-full shadow-lg" />
        </div>
      </div>

      {/* Level Display */}
      <div className="flex justify-center items-end mb-6">
        <p className="text-4xl sm:text-5xl font-medium text-gray-500">Lv.</p>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-400 ml-2 animate-glow">
          {levelData.level}
        </h1>
      </div>

      {/* XP Progress Bar */}
      <ProgressBar
        exp={data.profile.exp}
        label="XP Progress"
        className="mb-6 text-blue-400"
      />

      {/* Stats Section */}
      <div className="mb-4 mt-6 border-t border-blue-500 pt-4">
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-400">STATS</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data.profile.stats).map(([statName, value]) => (
            <ProgressBar
              key={statName}
              exp={value}
              label={`${statName.toUpperCase()}:`}
              className="text-sm text-blue-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
