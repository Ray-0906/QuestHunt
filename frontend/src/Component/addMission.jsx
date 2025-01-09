import React, { useEffect, useState } from "react";
import { addQuestAPI, addMissionAPI } from "../service/feature";
import { handleAuthCheck } from "../service/auth";
import { useDispatch } from "react-redux";
import { addMission } from "../store/authSlice";

const MissionForm = () => {
  const [mission, setMission] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "easy",
    quests: [],
  });
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
    } catch (error) {
      console.error("Error submitting mission");
    }
  };

  useEffect(() => {
    dispatch(handleAuthCheck);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-black via-gray-900 to-black text-white rounded-lg shadow-xl border-4 border-blue-600 font-sans">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400 tracking-wide uppercase">
        Create a Mission
      </h1>

      {/* Mission Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-300">Mission Title</label>
          <input
            type="text"
            name="title"
            value={mission.title}
            onChange={handleMissionChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-300">Mission Description</label>
          <textarea
            name="description"
            value={mission.description}
            onChange={handleMissionChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-300">Duration (in days)</label>
          <input
            type="number"
            name="duration"
            value={mission.duration}
            onChange={handleMissionChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-300">Difficulty</label>
          <select
            name="difficulty"
            value={mission.difficulty}
            onChange={handleMissionChange}
            className="w-full p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Quest Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-400 underline">Add Quests</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          name="name"
          placeholder="Quest Name"
          value={quest.name}
          onChange={handleQuestChange}
          className="flex-1 p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        />
        <select
          name="stat"
          value={quest.stat}
          onChange={handleQuestChange}
          className="p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          <option value="strength">Strength</option>
          <option value="dexterity">Dexterity</option>
          <option value="intelligence">Intelligence</option>
          <option value="charisma">Charisma</option>
        </select>
        <input
          type="number"
          name="exp"
          placeholder="EXP"
          value={quest.exp}
          onChange={handleQuestChange}
          className="w-20 p-3 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        />
        <button
          type="button"
          onClick={addQuest}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg"
        >
          Add
        </button>
      </div>

      {/* Quest List */}
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-bold text-blue-400 underline">Quests Added</h2>
        {questList.map((q, index) => (
          <div
            key={index}
            className="p-3 bg-gray-800 rounded-lg flex justify-between items-center shadow-lg border-l-4 border-blue-500"
          >
            <span className="text-lg text-blue-200">
              {q.name} - {q.stat} (<span className="text-green-400">{q.exp} EXP</span>)
            </span>
          </div>
        ))}
      </div>

      {/* Submit Mission */}
      <button
        type="button"
        onClick={submitMission}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg mt-6 shadow-lg"
      >
        Submit Mission
      </button>
    </div>
  );
};

export default MissionForm;
