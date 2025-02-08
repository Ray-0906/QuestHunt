import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MissionCard from "./MissionCard";
import EmptyQuests from "./Emptygate";

const Carousel = () => {
  const data = useSelector((state) => state.auth.userData);
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (data?.profile?.current_missions) {
      setCards(data.profile.current_missions);
    }
  }, [data,setCards,cards]);

  const prevCard = () => {
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };
    
  if(!cards.length)return (<EmptyQuests/>);

  return (
    <div className="relative w-full mx-auto overflow-hidden p-4 bg-gradient-to-b from-black via-gray-900 to-black border-y-2 border-blue-900/50 shadow-[0_0_50px_theme(colors.blue.900/0.3)]">
      {/* Particle effect overlay */}
      <div className="absolute inset-0 bg-[url('noise.png')] opacity-10 pointer-events-none" />
      
      <div className="relative flex items-center justify-center h-[500px] md:h-[600px] perspective-1000">
        {cards.map((card, index) => {
          let positionClass = "";
          const diff = (index - current + cards.length) % cards.length;

          if (diff === 0) {
            positionClass = "translate-x-0 scale-100 z-20 opacity-100 shadow-[0_0_40px_theme(colors.blue.500)]";
          } else if (diff === 1) {
            positionClass = "translate-x-[35%] scale-90 z-10 opacity-70 blur-[1px]";
          } else if (diff === cards.length - 1) {
            positionClass = "translate-x-[-35%] scale-90 z-10 opacity-70 blur-[1px]";
          } else {
            positionClass = "opacity-0 scale-50 z-0 hidden";
          }

          return (
            <div
              key={index}
              className={` absolute  transition-all duration-500 ${positionClass} 
                ${diff === 0 ? 'border-2 border-blue-500/50' : 'border border-blue-900/30'}
                bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 rounded-xl
                shadow-inner shadow-blue-900/30`}
            >
              <MissionCard missionId={card} />
              {diff === 0 && (
                <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/20 pointer-events-none animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevCard}
        className=" hidden md:block absolute left-4 z-50 top-1/2 -translate-y-1/2 p-3 rounded-full
          bg-black/50 border-2 border-blue-600/50 hover:border-cyan-400
          shadow-[0_0_15px_theme(colors.blue.500/0.3)] hover:shadow-[0_0_25px_theme(colors.cyan.500/0.5)]
          transition-all duration-300 group"
      >
        <span className="text-2xl text-blue-400 group-hover:text-cyan-400 font-mono transition-all">
          ◂
        </span>
      </button>

      <button
        onClick={nextCard}
        className=" hidden md:block absolute right-4 z-50 top-1/2 -translate-y-1/2 p-3 rounded-full
          bg-black/50 border-2 border-blue-600/50 hover:border-cyan-400
          shadow-[0_0_15px_theme(colors.blue.500/0.3)] hover:shadow-[0_0_25px_theme(colors.cyan.500/0.5)]
          transition-all duration-300 group"
      >
        <span className="text-2xl text-blue-400 group-hover:text-cyan-400 font-mono transition-all">
          ▸
        </span>
      </button>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-50">
        {cards.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all
              ${current === idx 
                ? 'bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)] scale-125'
                : 'bg-blue-900/50 hover:bg-blue-600 scale-100'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
