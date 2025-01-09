import React, { useEffect, useState } from "react";
import { getLevelDetails } from "../service/maths";

const ProgressBar = ({ exp, label = "" }) => {
  const [levelData, setLevelData] = useState({
    level: 0,
    currentLevelProgress: 0,
    xpGap: 0,
    progressPercentage: 0,
  });

  useEffect(() => {
    const levelDetails = getLevelDetails(exp);
    setLevelData(levelDetails);
  }, [exp]);

  const { currentLevelProgress, xpGap, progressPercentage, level } = levelData;

  return (
    <div className="flex flex-col space-y-2">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        {label && (
          <span className="text-sm font-medium text-blue-400">
            {label} Lv.{level}
          </span>
        )}
        <span className="text-sm font-medium text-gray-400">
          {currentLevelProgress} / {xpGap} XP
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-md">
        {/* Glowing Gradient Progress */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 shadow-xl transition-all"
          style={{ width: `${progressPercentage || 0}%` }}
        ></div>

        {/* Glow Effect */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 opacity-50 blur-lg transition-all"
          style={{ width: `${progressPercentage || 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
