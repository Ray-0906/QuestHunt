import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiGithub } from 'react-icons/fi'; // Or include your own SVG

const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-[#0a0a12] to-[#1a1a2f] py-16 px-4 border-t-2 border-[#2d2d4d] relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-gray-200 mb-6 font-sans drop-shadow-[0_0_15px_rgba(0,136,255,0.5)]">
          Start Your <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Adventure</span> Today!
        </h2>
        
        <p className="text-[#a0a0c0] text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Become the Hunter you were destined to be. Register now and awaken your true potential.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={'/signup'}
            className="relative bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-lg font-bold 
                     transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_20px_rgba(0,163,255,0.5)]
                     group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-lg" />
            Begin Your Ascent
          </Link>
          
          <a
            href="https://github.com/Ray-0906/QuestHunt"
            className="flex items-center gap-2 border border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg 
                     bg-[#1a1a2f] hover:bg-[rgba(0,163,255,0.1)] transition-colors duration-300
                     hover:shadow-[0_0_15px_rgba(0,163,255,0.3)]"
          >
            <FiGithub className="w-6 h-6" />
            View GitHub Repo
          </a>
        </div>

        <div className="mt-8 text-emerald-300 text-sm md:text-base drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">
          <span className="animate-pulse">🕹️</span> Current Players Online: 8,432
        </div>
      </div>
    </section>
  );
};

export default CTASection;