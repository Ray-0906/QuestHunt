const { Quest } = require('../Model/Quest');
const {Mission}=require('../Model/mission')  
const {User}=require('../Model/user')
const {createTracker, deleteMissionTracker}=require('./tracker')

//addQuest
const QuestAdder = async (req, res, next) => {
    const data = req.body;

    // Input validation
    if (!data.name || !data.stat || !data.exp) {
        return res.status(400).json({ message: "All fields (name, stat, exp) are required." });
    }

    try {
        const quest = await Quest.create({
            name: data.name,
            stat: data.stat,
            exp: data.exp,
        });

        res.status(201).json({ message: "Quest successfully created.", quest });
    } catch (error) {
        console.error("Failed to add Quest:", error);
        res.status(500).json({ message: "An error occurred while adding the quest." ,
            error: error.message
        });
        // Or pass the error to your error-handling middleware:
        // next(error);
    }
};


// Add Mission
const MissionAdder = async (req, res, next) => {
    const data = req.body;
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's information

    // Input validation
    const requiredFields = ["title", "duration", "difficulty"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            message: `Missing required fields: ${missingFields.join(", ")}`,
        });
    }

    // Validate difficulty value
    const validDifficulties = ["easy", "medium", "hard"];
    if (!validDifficulties.includes(data.difficulty)) {
        return res.status(400).json({
            message: `Difficulty must be one of: ${validDifficulties.join(", ")}`,
        });
    }

    try {
        // Create the mission
        const mission = await Mission.create({
            title: data.title,
            description: data.description || "",
            duration: data.duration,
            quests: data.quests || [],
            difficulty: data.difficulty,
            reward_points: data.reward_points || 0,
            users_in_progress: [userId], // Automatically add the current user
        });

        // Call the tracker handler to create the tracker
        const tracker = await createTracker(userId, mission);
        const profileUpdate = await addMissionToCurrentMissions(userId, mission);

        res.status(201).json({
            message: "Mission successfully created and tracker initialized.",
            mission,
            tracker,
        });
    } catch (error) {
        console.error("Failed to add Mission and Tracker:", error);
        res.status(500).json({
            message: "An error occurred while adding the mission and tracker.",
        });
    }
};

// USer update Executed when a mission is added 
const addMissionToCurrentMissions = async (userId, missionId) => {
    try {
        // Find the user and update their current_missions
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { "profile.current_missions": missionId } }, // Add missionId only if it doesn't already exist
            { new: true } // Return the updated user document
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Failed to update current missions:", error);
        throw new Error("Failed to update user's current missions");
    }
};


// Remove MIssion
const deleteMission = async (req, res) => {
    const { missionId } = req.body;
    const userId = req.user?.id;
  
    if (!missionId || !userId) {
      return res.status(400).json({
        message: "Mission ID and User ID are required.",
      });
    }
  
    try {
      await removeMissionFromCurrentMissions(userId, missionId);
      await deleteMissionTracker(userId, missionId);
  
      res.status(200).json({
        message: "Deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting mission:", error); // Log the error for debugging
      res.status(500).json({
        message: "Failed to delete mission.",
        error: "An unexpected error occurred.", // Avoid sending raw error to the client
      });
    }
  };
  

const removeMissionFromCurrentMissions = async (userId, missionId) => {
    try {
        // Find the user and update their current_missions by removing the missionId
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { "profile.current_missions": missionId } }, // Remove the missionId from the array
            { new: true } // Return the updated user document
        );

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Failed to remove mission from current missions:", error);
        throw new Error("Failed to update user's current missions");
    }
};




// MIssion Completion

/*
const completeMissionHandler = async (req, res) => {
    const { missionId } = req.body;
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's information

    try {
        // Remove the mission from the user's current_missions
        const updatedUser = await removeMissionFromCurrentMissions(userId, missionId);

        res.status(200).json({
            message: "Mission successfully completed and removed from current missions.",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Failed to complete mission:", error);
        res.status(500).json({
            message: "An error occurred while completing the mission.",
        });
    }
};

*/

// Exports 
module.exports={QuestAdder, MissionAdder,removeMissionFromCurrentMissions,deleteMission }
