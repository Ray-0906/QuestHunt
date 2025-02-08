const { Tracker } = require('../Model/Tracker');
const { Mission } = require('../Model/mission')
const { addUserReward, updateUserStats } = require('./stat')

//adds Tracker 
const createTracker = async (userId, mission) => {
  try {
    const tracker = await Tracker.create({
      userId: userId,
      missionId: mission._id,
      questSet: mission.quests, // Initialize with all quests from the mission
      streak: 0, // Initial streak is 0
      duration: mission.duration,
      lastUpdated: Date.now(), // Track when the tracker was created 


    });

    return tracker;
  } catch (error) {
    console.error("Failed to create tracker:", error);
    throw new Error("Tracker creation failed");
  }
};

//update tracker  will receive request via http
const updateQuestCompletion = async (req, res) => {
  const userId = req.user.id;
  const { missionId, questId } = req.body;

  try {
    // Fetch the tracker with mission details
    const tracker = await Tracker.findOne({ userId, missionId }).populate('missionId');

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: 'Tracker not found for the given user and mission.',
      });
    }

    // Validate questId
    const questIndex = tracker.questSet.indexOf(questId);
    if (questIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Quest already completed or invalid quest ID.',
      });
    }

    // Remove the quest and update tracker
    tracker.questSet.splice(questIndex, 1);
    // Update user stats
    let statsResult = await updateUserStats(userId, questId, 0);
    if (!statsResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Quest completion recorded, but failed to update user stats.',
        error: statsResult.error,
      });
    }

    const mission = tracker.missionId; // Store mission details
    let isMissionCompleted = false;

    // Handle streaks and mission completion
    if (tracker.questSet.length === 0) {
      tracker.streak += 1;
      tracker.lastUpdated = new Date();
      
      let streakStatsResult = await updateUserStats(userId, questId, 1);
      if (!streakStatsResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Streak updated, but failed to update user stats.',
          error: streakStatsResult.error,
        });
      }

      // If mission is fully completed
      if (tracker.streak === mission.duration) {
        const rewardPoints = mission.reward_points;
        const rewardResult = await addUserReward(userId, rewardPoints, missionId);

        if (!rewardResult.success) {
          return res.status(500).json({
            success: false,
            message: 'Mission completed, but failed to add rewards to the user.',
            error: rewardResult.error,
          });
        }

        await deleteMissionTracker(userId, missionId);
        isMissionCompleted = true;

        return res.status(200).json({
          success: true,
          message: `Mission completed successfully! ${rewardResult.message}`,
          streak: tracker.streak,
          isCompleted: true,
          updatedStats: rewardResult.updatedStats,
          updatedExp: rewardResult.updatedExp,
        });
      }
    }

    // Save tracker updates
    await tracker.save();

    res.status(200).json({
      success: true,
      message: `Quest completed successfully! ${statsResult.message}`,
      streak: tracker.streak,
      isCompleted: isMissionCompleted,
      updatedStats: statsResult.updatedStats,
      updatedExp: statsResult.updatedExp,
    });
  } catch (error) {
    console.error('Error updating quest completion and user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quest completion and user stats.',
      error: error.message,
    });
  }
};



// Delete Tracker 
const deleteMissionTracker = async (userId, missionId) => {
  try {
    // Find and delete the tracker
    const deletedTracker = await Tracker.findOneAndDelete({ userId, missionId });

    if (!deletedTracker) {
      return {
        success: false,
        message: 'Mission tracker not found.',
      };
    }

    return {
      success: true,
      message: 'Mission tracker deleted successfully.',
      deletedTracker,
    };
  } catch (error) {
    console.error('Error deleting mission tracker:', error.message);
    return {
      success: false,
      message: 'Failed to delete mission tracker.',
      error: error.message,
    };
  }
};




// addReward Function


module.exports = { createTracker, updateQuestCompletion, deleteMissionTracker };
