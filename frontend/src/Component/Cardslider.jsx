import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MissionCard from "./MissionCard";

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

  return (
    <div className="relative w-full mx-auto p-4">
      <div className="relative flex items-center justify-center h-[400px] md:h-[500px] perspective">
        {cards.map((card, index) => {
          let positionClass = "";
          const diff = (index - current + cards.length) % cards.length;

          if (diff === 0) {
            positionClass = "translate-x-0 scale-100 z-20 opacity-100 shadow-2xl";
          } else if (diff === 1) {
            positionClass = "translate-x-[30%] scale-75 z-10 opacity-70";
          } else if (diff === cards.length - 1) {
            positionClass = "translate-x-[-30%] scale-75 z-10 opacity-70";
          } else {
            positionClass = "opacity-0 scale-50 z-0 hidden";
          }

          return (
            <div
              key={index} 
              className={`absolute transition-all duration-500 ${positionClass}`}
            >
              <MissionCard missionId={card} />
            </div>
          );
        })}
      </div>
      <button
        onClick={prevCard}
        className="absolute left-4 z-50 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 md:p-4"
      >
        &#8249;
      </button>
      <button
        onClick={nextCard}
        className="absolute right-4 z-50 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 md:p-4"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
