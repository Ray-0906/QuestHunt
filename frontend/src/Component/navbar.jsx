import React from "react";
import './css/nav.css'
const Navbar1 = () => {
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-gradient">
            <span className="from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              LifeQuest
            </span>
          </div>
        </div>

        {/* Links Section */}
        <ul className="flex space-x-6">
          <li>
            <a
              href="#dashboard"
              className="text-gray-300 hover:text-white font-semibold text-lg tracking-wider"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#quests"
              className="text-gray-300 hover:text-white font-semibold text-lg tracking-wider"
            >
              Quests
            </a>
          </li>
          <li>
            <a
              href="#missions"
              className="text-gray-300 hover:text-white font-semibold text-lg tracking-wider"
            >
              Missions
            </a>
          </li>
          <li>
            <a
              href="#profile"
              className="text-gray-300 hover:text-white font-semibold text-lg tracking-wider"
            >
              Profile
            </a>
          </li>
        </ul>

        {/* Right Section (Optional for Icons or Profile Dropdown) */}
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 py-2 px-4 text-sm font-bold rounded-lg shadow-md text-gray-900 hover:shadow-xl">
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
