
const mongoose=require('mongoose');

const MissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // Duration in days
  quests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quest" }],
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  reward_points: { type: Number, default: 0 }, // Calculated based on quests
  users_in_progress: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  
},
{
 timestamps:true
}
);

MissionSchema.pre("save", async function (next) {
  if (this.isModified("quests") || this.isModified("difficulty")) {
    // Fetch all quests linked to this mission
    const Quest = mongoose.model("Quest");
    const quests = await Quest.find({ _id: { $in: this.quests } });

    // Calculate base reward points based on quests
    let basePoints = quests.reduce((sum, quest) => sum + (quest.exp || 0), 0);

    // Adjust reward points based on difficulty
    const difficultyMultiplier = {
      easy: 1,
      medium: 1.5,
      hard: 2
    };

    this.reward_points = Math.ceil(basePoints * (difficultyMultiplier[this.difficulty] || 1));
  }

  next();
});


const Mission=mongoose.model('Mission',MissionSchema);

module.exports={Mission};