import React from "react";
import './css/logo.css'
const Logo = () => {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide relative">
        {/* Main Logo Text */}
        <span className="from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent bg-gradient-to-r animate-gradient-move">
          LifeQuest
        </span>

        {/* Glowing Effect */}
        <span className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 blur-lg opacity-50 -z-10"></span>
      </h1>
    </div>
  );
};

export default Logo;
