import React, { useState, useEffect } from "react";
import { doneQuest, getMission, getQuests } from "../service/feature";
import { removeMission, updateExp, updateStats } from "../store/authSlice";
import { useDispatch } from "react-redux";

const MissionCard = ({ missionId }) => {
  const [mission, setMission] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questCompletion, setQuestCompletion] = useState({});
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const missionData = await getMission(missionId);
        const questsData = await getQuests(missionId);
        console.log(questsData);
        setMission(missionData);
        setQuests(questsData);

        const initialCompletion = questsData.reduce((acc, quest) => {
          acc[quest._id] = false;
          return acc;
        }, {});
        setQuestCompletion(initialCompletion);
      } catch (error) {
        console.error("Error fetching mission data:", error);
      }
    };

    if (missionId) {
      fetchMissionData();
    }
  }, [missionId]);

  const handleCheckboxChange = async(questId) => {
try {
  setQuestCompletion((prevState) => ({
    ...prevState,
    [questId]: !prevState[questId],
  }));
  const data = await doneQuest(mission,questId);
    if(data.updatedStats)
      {dispatch(updateStats(data.updatedStats));}
   if(!data.updatedExp){
    dispatch(updateExp(data.updatedExp));
    dispatch(removeMission(missionId));
   }
  
} catch (error) {
  
}
    


  };

  if (!mission) {
    return (
      <div className="w-80 h-96 mx-auto p-4 bg-gradient-to-b from-black to-gray-900 text-white rounded-lg shadow-lg flex items-center justify-center animate-pulse">
        <p className="text-lg text-blue-400">Loading mission details...</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-96 mx-auto p-4 bg-gradient-to-b from-black via-gray-800 to-black text-white rounded-lg shadow-2xl border-2 border-blue-500 font-sans">
      {/* Mission Details */}
      <div className="border-b border-gray-700 pb-2 mb-4">
        <h2 className="text-2xl font-extrabold text-blue-400 tracking-wide uppercase">
          {mission.title}
        </h2>
        <p className="text-sm text-gray-300 mt-1 italic">{mission.description}</p>
        <p className="text-sm font-semibold mt-2 text-purple-400">
          Duration: {mission.duration} days
        </p>
      </div>

      {/* Quests Checklist */}
      <h3 className="text-lg font-bold text-blue-300 mb-2 underline">Quests</h3>
      <ul className="space-y-3 overflow-y-auto scrollbar-hide h-40">
        {quests.map((quest) => (
          <li
            key={quest._id}
            className={`flex items-center justify-between p-3 rounded-lg shadow-lg ${
              questCompletion[quest._id]
                ? " border-green-700"
                : "bg-gradient-to-r from-gray-800 via-gray-900 to-black border-gray-700"
            } border-2`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="w-5 h-5 text-green-500 border-2 border-gray-500 rounded-md focus:ring-0 focus:outline-none"
                checked={questCompletion[quest._id]}
                onChange={() => handleCheckboxChange(quest._id)}
              />
              <span
                className={`text-sm font-mono ${
                  questCompletion[quest._id]
                    ? "text-green-400 italic line-through"
                    : "text-white"
                }`}
              >
                {quest.name}
              </span>
            </div>
            <span className="text-blue-400 font-semibold">+{quest.exp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionCard;
