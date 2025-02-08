import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { Link } from 'react-router';

const SoloLevelingFooter = () => {
  return (
    <footer className="relative bg-[#0a0a15]/95 backdrop-blur-sm border-t border-blue-900/50 
      text-blue-400/80 py-8 overflow-hidden">

      {/* Glowing border effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s infinite linear`,
              transform: `scale(${0.5 + Math.random() * 2})`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* System Information */}
          <div className="space-y-4 z-50">
            <h3 className="text-lg font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-cyan-400 tracking-widest mb-4">
              SYSTEM STATUS
            </h3>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Operational: Normal</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span>Gates: Active</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Players: Online</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='z-50'>
            <h3 className="text-lg font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-cyan-400 tracking-widest mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Gate Archives</a></li>
              <li><Link to={'/rankings'} className="hover:text-cyan-400 transition-colors">Hunter Rankings</Link></li>
              <li><Link to={'/quests'} className="hover:text-cyan-400 transition-colors">System Logs</Link></li>
              <li><a href="#protocol" className="hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='z-50'>
            <h3 className="text-lg font-bold text-transparent bg-clip-text 
    bg-gradient-to-r from-blue-400 to-cyan-400 tracking-widest mb-4">
              CONNECT
            </h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/astra.asraful/" className="p-2 bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-all shadow-md shadow-blue-500/50">
                <svg className="w-6 h-6 text-blue-400 hover:text-cyan-300 transition-all" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.5 2 2 4.5 2 7.75v8.5C2 19.5 4.5 22 7.75 22h8.5C19.5 22 22 19.5 22 16.25v-8.5C22 4.5 19.5 2 16.25 2h-8.5zm8.95 3.75a.7.7 0 0 1 .7.7v1.5a.7.7 0 0 1-.7.7h-1.5a.7.7 0 0 1-.7-.7v-1.5a.7.7 0 0 1 .7-.7h1.5zM12 7.75A4.25 4.25 0 0 1 16.25 12 4.25 4.25 0 0 1 12 16.25 4.25 4.25 0 0 1 7.75 12 4.25 4.25 0 0 1 12 7.75zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>
              <a href="www.linkedin.com/in/asraful-u3716" className="p-2 bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-all shadow-md shadow-blue-500/50">
                <svg className="w-6 h-6 text-blue-400 hover:text-cyan-300 transition-all" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V9h3v10zm-1.5-11.4c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.7 1.7-1.7 1.7zM20 19h-3v-5.3c0-1.3-1.1-2.3-2.3-2.3-1.3 0-2.3 1.1-2.3 2.3V19h-3V9h3v1.4c.8-1 2-1.4 3.2-1.4 2.4 0 4.4 2 4.4 4.4V19z" />
                </svg>
              </a>
              <a href="www.linkedin.com/in/asraful-u3716" className="p-2 bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-all shadow-md shadow-blue-500/50">
                <svg className="w-6 h-6 text-blue-400 hover:text-cyan-300 transition-all" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 4.5a10.5 10.5 0 0 1-3 .8 5.3 5.3 0 0 0 2.3-2.9 10.6 10.6 0 0 1-3.4 1.3 5.3 5.3 0 0 0-9.1 4.8A15 15 0 0 1 2 3.2a5.3 5.3 0 0 0 1.7 7 5.3 5.3 0 0 1-2.4-.7v.1c0 2.6 1.9 4.8 4.4 5.3a5.3 5.3 0 0 1-2.4.1 5.3 5.3 0 0 0 4.9 3.7A10.6 10.6 0 0 1 1 18.4 15 15 0 0 0 8.1 20c9.4 0 14.5-7.8 14.5-14.5V5a10.5 10.5 0 0 0 2.5-2.5z" />
                </svg>
              </a>
            </div>
          </div>


          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-400 to-cyan-400 tracking-widest mb-4">
              CONTACT
            </h3>
            <ul className="space-y-2">
              <li>Email: support@hunter-system.com</li>
              <li>Phone: +1 (555) GATE-123</li>
              <li>HQ: Seoul, South Korea</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-900/50 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Hunter System. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-blue-500/50">
            Designed for the Shadow Monarch's Army
          </p>
        </div>
      </div>

      {/* Style definitions */}
      <style >{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(-40px) rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default SoloLevelingFooter;