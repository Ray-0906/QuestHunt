import React, { useState, useEffect } from "react";
import { doneQuest, getMission, getQuests } from "../service/feature";
import { removeMission, updateExp, updateStats } from "../store/authSlice";

import { useDispatch } from "react-redux";
import QuestRewardPopup from "./Rpopup";
import SoloLoading from "./Loading";

const MissionCard = ({ missionId }) => {
   const [isLoading, setIsLoading] = useState(false);
  const [mission, setMission] = useState(null);
  const [quests, setQuests] = useState([]);
  const [streak, setStreak] = useState(0);
  const [questCompletion, setQuestCompletion] = useState({});
  const [rewardTrigger, setRewardTrigger] = useState(0);
  const [reward, setReward] = useState(0);
  const dispatch=useDispatch();
  useEffect(() => {
    setIsLoading(true);
    const fetchMissionData = async () => {
      try {
        const missionData = await getMission(missionId);
        const questsData = await getQuests(missionId);
        setMission(missionData.mission);
        setStreak(missionData.streak);
        setQuests(questsData);

        const initialCompletion = questsData.reduce((acc, quest) => {
          acc[quest._id] = false;
          return acc;
        }, {});
        setQuestCompletion(initialCompletion);
      } catch (error) {
        console.error("Error fetching mission data:", error);
      }
      finally{
        setIsLoading(false);
      }
    };

    if (missionId) {
      fetchMissionData();
    }
  }, [missionId]);

  const handleCheckboxChange = async(questId,exp) => {
try {
  setQuestCompletion((prevState) => ({
    ...prevState,
    [questId]: !prevState[questId],
  }));
  const data = await doneQuest(mission,questId);
  setReward(exp);
  setRewardTrigger(prev => prev + 1);
    if(data.updatedStats)
      {dispatch(updateStats(data.updatedStats));}
   if(!data.updatedExp){
    dispatch(updateExp(data.updatedExp));
    dispatch(removeMission(missionId));
   }
  // update animation here 
} catch (error) {
  
}
    


  };

  if (!mission) {
    return (
      <div className="w-80 h-96 mx-auto p-4 bg-black/90 text-white rounded-lg border-2 border-blue-500/50 shadow-glow-blue animate-pulse">
         {isLoading && <SoloLoading />}
        <p className="text-lg text-blue-400/80 font-mono tracking-widest">
          INITIALIZING MISSION...
        </p>
      </div>
    );
  }

  return (
    <div className="w-72 md:w-[20rem] h-98 mx-auto p-4 bg-[#0a0a15]/95 backdrop-blur-sm rounded-lg 
      border-2 border-blue-500/30 shadow-2xl shadow-blue-900/30
      font-mono relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(130deg,#00f6ff12_35%,#0000_65%)]">
      {isLoading && <SoloLoading />}
      {/* Mission Header */}
      <div className="border-b border-blue-900/50 pb-3 mb-4 relative">
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-400 tracking-wider uppercase mb-1 drop-shadow-[0_0_8px_rgba(0,198,255,0.4)]">
          {mission.title}
        </h2>
        <div className=" max-h-14 ">
         <p className="text-sm  h-12 overflow-auto  text-blue-300/80 tracking-tight mb-2">
          {mission.description}
        </p> 
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-amber-400/80 font-semibold">
            ⌛ {mission.duration-streak} DAYS
          </span>
          <span className="text-purple-400/80">DIFFICULTY: {mission.difficulty || 'B'}</span>
        </div>
      </div>
      <QuestRewardPopup exp={reward} trigger={rewardTrigger} />
      {/* Quests List */}
      <h3 className="text-sm text-blue-400/80 uppercase tracking-wider mb-3 font-semibold">
        SUB OBJECTIVES
      </h3>
      <ul className="space-y-3 overflow-y-auto h-48 pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-900/50">
        {quests.length!=0? quests.map((quest) => (
          <li
            key={quest._id}
            className={`group relative p-2.5 rounded-md transition-all duration-300
              ${questCompletion[quest._id] 
                ? 'bg-green-900/10 border border-green-600/40 shadow-glow-green'
                : 'bg-black/30 border border-blue-900/50 hover:border-blue-600/70 hover:shadow-glow-blue'}
              `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={questCompletion[quest._id]}
                    onChange={() => handleCheckboxChange(quest._id,quest.exp)}
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center
                    ${questCompletion[quest._id] 
                      ? 'border-green-500 bg-green-900/20 shadow-glow-green-sm'
                      : 'border-blue-600 bg-blue-900/10 group-hover:border-blue-400'}`}>
                    {questCompletion[quest._id] && (
                      <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_6px_#00ff88]" />
                    )}
                  </div>
                </label>
                <span className={`text-sm tracking-tight ${
                  questCompletion[quest._id] 
                    ? 'text-green-400/90 line-through'
                    : 'text-blue-200/90'
                }`}>
                  {quest.name}
                </span>
              </div>
              <span className={`text-xs font-bold ${
                questCompletion[quest._id] ? 'text-green-400/80' : 'text-blue-400/80'
              }`}>
                +{quest.exp}XP
              </span>
            </div>
          </li>
        )): <p className="text-blue-400/80">No Quests Available</p>}
      </ul>
    </div>
  );
};

export default MissionCard;
