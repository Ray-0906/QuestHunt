const { Tracker } = require('../Model/Tracker');
const { Quest } = require('../Model/Quest');
const jwt = require('jsonwebtoken');
const {User}=require('../Model/user');
const {Mission}=require('../Model/mission');

const getTrackerQuestSet = async (req, res) => {
  const userId = req.user.id;
  const { missionId } = req.body;

  try {
    // Find the tracker for the given user and mission, populate missionId and its quests
    let tracker = await Tracker.findOne({ userId, missionId }).populate({
      path: 'missionId',
      populate: { path: 'quests', model: 'Quest' }, // Populate quests within missionId
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: 'Tracker not found for the given user and mission.',
      });
    }

    // Get current date (yyyy-mm-dd format for comparison)
    const today = new Date().toISOString().split('T')[0];
    
    
    const lastUpdated = tracker.lastUpdated.toISOString().split('T')[0];
 console.log(lastUpdated,today);
    if (lastUpdated !== today) {
      // Update questSet with quests from mission
      console.log('Resetting quest set for outdated tracker:',lastUpdated, today);
      tracker.questSet = tracker.missionId.quests.map((quest) => quest._id); // Store quest IDs
      tracker.lastUpdated = new Date(); // Update to current date

      // Save updated tracker
      await tracker.save();
    }

    // Populate updated questSet with details
    tracker = await Tracker.findOne({ userId, missionId }).populate({
      path: 'questSet',
      model: 'Quest',
    });

    // Return the updated questSet
    res.status(200).json({
      success: true,
      questSet: tracker.questSet,
    });
  } catch (error) {
    console.error('Error fetching tracker quest set:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tracker quest set.',
      error: error.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    // Fetch users with only username and profile fields
    const usersprofiles = await User.find({}, { username: 1, profile: 1, _id: 0 });

    // Sorting users based on profile.stats.exp (descending order)
    const userArray = usersprofiles.sort((a, b) => (b.profile.exp || 0) - (a.profile.exp || 0));

    // Check if users exist
    if (userArray.length > 0) {
      return res.status(200).json({
        success: true,
        users: userArray
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No users found"
      });
    }

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


const getMission = async (req, res) => {
  const userId = req.user.id;
  const { missionId } = req.body;

  // Validate missionId
  if (!missionId) {
    return res.status(400).json({
      success: false,
      message: 'Mission ID is required.',
    });
  }

  try {
    // Find the mission with the given missionId and ensure it belongs to the user
    const mission = await Mission.findOne({ _id: missionId});
    let tracker = await Tracker.findOne({ userId, missionId });
    if (!mission) {
      return res.status(404).json({
        success: false,
        message: 'Mission not found for the given user.',
      });
    }
    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: 'Tracker not found for the given user and mission.',
      });
    }
    const streak=tracker.streak;
    // Return the mission details
    return res.status(200).json({
      success: true,
      mission,
      streak
    });
  } catch (error) {
    console.error('Error fetching mission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch mission.',
      error: error.message,
    });
  }
};

const handleGetCurrentUser = async (req, res) => {
  const user = req.user;

  try {
    

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};



module.exports = { getTrackerQuestSet ,handleGetCurrentUser,getMission,allUsers};
