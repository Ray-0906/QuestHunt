import React, { useEffect, useState } from "react";
import { addQuestAPI, addMissionAPI } from "../service/feature";
import { handleAuthCheck } from "../service/auth";
import { useDispatch } from "react-redux";
import { addMission } from "../store/authSlice";
import { useNavigate } from "react-router";
import SoloLoading from "./Loading";

const MissionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mission, setMission] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "easy",
    quests: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quest, setQuest] = useState({ name: "", stat: "strength", exp: "" });
  const [questList, setQuestList] = useState([]);

  const handleMissionChange = (e) => {
    e.preventDefault();
    setMission({ ...mission, [e.target.name]: e.target.value });
  };

  const handleQuestChange = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };

  const addQuest = async (e) => {
    e.preventDefault();
    try {
      const newQuest = await addQuestAPI(quest);
      setQuestList([...questList, newQuest.quest]);
      setMission({ ...mission, quests: [...mission.quests, newQuest.quest._id] });
      setQuest({ name: "", stat: "strength", exp: "" });
    } catch (error) {
      console.error("Error adding quest");
    }
  };

  const submitMission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //console.log(mission);
      const addedMission = await addMissionAPI(mission);
      
      dispatch(addMission(addedMission._id));
      alert("Mission added successfully!");
      setMission({
        title: "",
        description: "",
        duration: "",
        difficulty: "easy",
        quests: [],
      });
      setQuestList([]);
      navigate('/quests');
    } catch (error) {
      console.error("Error submitting mission");
    }
    finally{
      setIsLoading(false);}
  };

  useEffect(() => {
    dispatch(handleAuthCheck);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-[#0a0a15]/95 backdrop-blur-sm rounded-2xl 
      border-2 border-blue-500/30 shadow-2xl shadow-blue-900/30
      font-mono relative overflow-hidden 
      before:absolute before:inset-0 before:bg-[linear-gradient(130deg,#00f6ff12_35%,#0000_65%)]
      before:pointer-events-none">
      
      {isLoading && <SoloLoading />}
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none 
        border border-blue-500/20 shadow-[inset_0_0_20px_rgba(0,198,255,0.1)]" />

      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text 
        bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-400 tracking-widest
        drop-shadow-[0_0_8px_rgba(0,198,255,0.4)] uppercase">
        INITIATE GATE CREATION
      </h1>

      {/* Mission Details */}
      <div className="space-y-6 mb-12">
        <div>
          <label className="block text-sm text-blue-400/80 mb-2 tracking-wider">⫸ GATE TITLE</label>
          <input
            type="text"
            name="title"
            value={mission.title}
            onChange={handleMissionChange}
            className="w-full p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
              text-blue-200/90 focus:outline-none focus:border-cyan-400/60
              focus:shadow-glow-blue transition-all placeholder-blue-600/70"
            placeholder="ENTER GATE DESIGNATION"
          />
        </div>

        <div>
          <label className="block text-sm text-blue-400/80 mb-2 tracking-wider">⫸ GATE PARAMETERS</label>
          <textarea
            name="description"
            value={mission.description}
            onChange={handleMissionChange}
            className="w-full p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
              text-blue-200/90 focus:outline-none focus:border-cyan-400/60
              focus:shadow-glow-blue transition-all placeholder-blue-600/70 h-32"
            placeholder="INPUT DUNGEON SPECIFICATIONS"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-blue-400/80 mb-2 tracking-wider">⫸ TIME DILATION</label>
            <input
              type="number"
              name="duration"
              value={mission.duration}
              onChange={handleMissionChange}
              className="w-full p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
                text-blue-200/90 focus:outline-none focus:border-cyan-400/60
                focus:shadow-glow-blue transition-all"
              placeholder="DAYS"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-400/80 mb-2 tracking-wider">⫸ THREAT LEVEL</label>
            <select
              name="difficulty"
              value={mission.difficulty}
              onChange={handleMissionChange}
              className="w-full p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
                text-blue-200/90 focus:outline-none focus:border-cyan-400/60
                focus:shadow-glow-blue transition-all appearance-none"
            >
              <option value="easy" className="bg-black/90">E-RANK</option>
              <option value="medium" className="bg-black/90">B-RANK</option>
              <option value="hard" className="bg-black/90">S-RANK</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quest Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-400 to-cyan-400 tracking-widest">
          // OBJECTIVE PROTOCOLS
        </h2>

        <div className="flex flex-wrap gap-4 mb-6 md:flex-nowrap">
  <input
    type="text"
    name="name"
    placeholder="OBJECTIVE NAME"
    value={quest.name}
    onChange={handleQuestChange}
    className="flex-1 min-w-0 p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
      text-blue-200/90 focus:outline-none focus:border-cyan-400/60
      focus:shadow-glow-blue transition-all placeholder-blue-600/70 w-full"
  />
  
  <select
    name="stat"
    value={quest.stat}
    onChange={handleQuestChange}
    className="p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
      text-blue-200/90 focus:outline-none focus:border-cyan-400/60
      focus:shadow-glow-blue transition-all w-full md:w-40"
  >
    <option value="strength" className="bg-black/90">MIGHT</option>
    <option value="dexterity" className="bg-black/90">AGILITY</option>
    <option value="intelligence" className="bg-black/90">ARCANA</option>
    <option value="charisma" className="bg-black/90">CHARISMA</option>
  </select>

  <input
    type="number"
    name="exp"
    placeholder="XP"
    value={quest.exp}
    onChange={handleQuestChange}
    className="p-4 bg-black/30 border-2 border-blue-900/50 rounded-lg 
      text-blue-200/90 focus:outline-none focus:border-cyan-400/60
      focus:shadow-glow-blue transition-all w-full md:w-24"
  />

  <button
    type="button"
    onClick={addQuest}
    className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 
      text-white font-bold rounded-lg shadow-glow-blue-lg transition-all
      flex items-center justify-center w-full md:w-auto"
  >
    INSERT
  </button>
</div>


        {/* Quest List */}
        <div className="space-y-4">
          {questList.map((q, index) => (
            <div
              key={index}
              className="p-4 bg-black/20 rounded-lg border-2 border-blue-900/50
                hover:border-cyan-400/60 hover:shadow-glow-blue transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-blue-300/90 tracking-wide">
                  <span className="text-cyan-400/90">{q.name}</span> - 
                  <span className="text-amber-400/90 ml-2">[{q.stat.toUpperCase()}]</span>
                </span>
                <span className="text-green-400/90 font-bold text-xl">
                  +{q.exp}XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={submitMission}
        className="w-full py-5 bg-gradient-to-r from-blue-700 to-cyan-700 
          hover:from-blue-600 hover:to-cyan-600 text-white font-black 
          rounded-2xl shadow-glow-blue-lg transition-all tracking-widest
          text-xl uppercase border-2 border-cyan-400/30 hover:border-cyan-400/60"
      >
        ACTIVATE GATE
      </button>
    </div>
  );
};

export default MissionForm;
