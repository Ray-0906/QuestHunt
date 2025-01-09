const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  missionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission',
    required: true,
  },
  questSet: {
    type: [mongoose.Schema.Types.ObjectId], // Array of Quest IDs
    ref: 'Quest',
    required: true,
  },
  streak: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Midnight timestamp
      return today;
    },
  },
});

// Middleware to update outdated trackers during save or findOneAndUpdate
trackerSchema.pre(['save', 'findOneAndUpdate'], async function (next) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Reset time to midnight

  if (this.lastUpdated < todayStart) {
    // Fetch the mission to reset questSet
    const mission = await mongoose.model('Mission').findById(this.missionId);
    if (mission) {
      this.questSet = mission.quests; // Reset questSet
    }
    this.lastUpdated = todayStart; // Update timestamp
  }

  next();
});

// Utility function to handle outdated trackers for `find` and `findOne`
trackerSchema.statics.updateOutdatedTrackers = async function (filter = {}) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Reset time to midnight

  const trackers = await this.find(filter).populate('missionId');
  for (const tracker of trackers) {
    if (tracker.lastUpdated < todayStart) {
      const mission = await mongoose.model('Mission').findById(tracker.missionId);
      if (mission) {
        tracker.questSet = mission.quests; // Reset questSet
        tracker.lastUpdated = todayStart;
        await tracker.save(); // Save the updated tracker
      }
    }
  }
};

const Tracker = mongoose.model('Tracker', trackerSchema);
module.exports = { Tracker };
