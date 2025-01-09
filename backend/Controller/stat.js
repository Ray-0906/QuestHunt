const {User}=require('../Model/user')
const {Quest}=require('../Model/Quest')

const updateUserStats = async (userId, questId) => {
  try {
    // Fetch the quest details
    const quest = await Quest.findById(questId);
    if (!quest) {
      throw new Error('Quest not found.');
    }

    const { stat, exp } = quest; // Assuming quest has `stat` and `exp` fields
    if (!stat || typeof exp !== 'number') {
      throw new Error('Invalid quest data: missing stat or exp.');
    }

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }

    // Update the corresponding stat in the user's profile
    if (!user.profile.stats.hasOwnProperty(stat)) {
      throw new Error(`Invalid stat type: ${stat} does not exist in user stats.`);
    }
    user.profile.stats[stat] += exp;

    // Save the user
    await user.save();

    return {
      success: true,
      message: `User's ${stat} stat increased by ${exp}.`,
      updatedStats: user.profile.stats,
    };
  } catch (error) {
    console.error('Error updating user stats:', error.message);
    return {
      success: false,
      message: 'Failed to update user stats.',
      error: error.message,
    };
  }
};


// Add Reward on Mission completion 

const addUserReward = async (userId, rewardPoints, missionId) => {
  try {
    // Fetch the user
    const user = await User.findById(userId);

    if (!user) {
      return {
        success: false,
        message: 'User not found for reward assignment.',
      };
    }

    // Add reward points to user's exp
    user.profile.exp += (2*rewardPoints);

    // Example: Distribute reward points across stats (you can adjust this logic)
    user.profile.stats.strength += Math.floor(rewardPoints / 4);
    user.profile.stats.dexterity += Math.floor(rewardPoints / 4);
    user.profile.stats.intelligence += Math.floor(rewardPoints / 4);
    user.profile.stats.charisma += Math.floor(rewardPoints / 4);

const missionIdToRemove = missionId._id;
 

user.profile.current_missions = user.profile.current_missions.filter(
  (id) => id.toString() !== missionIdToRemove.toString()
);

await user.save();

   
    return {
      success: true,
      message: `User rewarded with ${rewardPoints} points. EXP and stats updated.`,
      isCompleted:true,
      updatedStats: user.profile.stats,
      updatedExp: user.profile.Userexp,
    };
  } catch (error) {
    console.error('Error adding rewards to user:', error);
    return {
      success: false,
      message: 'Failed to add rewards to user.',
      error: error.message,
    };
  }
};


module.exports={updateUserStats,addUserReward}
