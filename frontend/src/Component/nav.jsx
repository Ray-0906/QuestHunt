import React, { useState } from 'react';
import { User, Menu, LogOut, Store } from 'lucide-react';
import './css/nav.css';

const SoloLevelingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="solo-leveling-nav w-full">
      {/* Mobile Navbar */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <button className="solo-leveling-button border-sky-200" aria-label="Profile">
          <User size={24} />
        </button>
        <div className="solo-leveling-logo">SOLO LEVELING</div>
        <button className="solo-leveling-button" onClick={toggleMenu} aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center p-4">
        <button className="solo-leveling-button" aria-label="Profile">
          <User size={24} />
        </button>
        <div className="solo-leveling-logo">Quest Hunt</div>
        <div className="flex gap-4">
          <button className="solo-leveling-button flex items-center gap-2">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <button className="solo-leveling-button flex items-center gap-2">
            <Store size={20} />
            <span>Store</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="solo-leveling-menu md:hidden absolute top-16 right-0 rounded-md shadow-lg p-4 z-10">
          <button className="solo-leveling-button flex items-center gap-2 mb-2 w-full justify-start">
          <Store size={20} />
          <span>Store</span>
          </button>
          <button className="solo-leveling-button flex items-center gap-2 w-full justify-start">
            
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default SoloLevelingNavbar;

