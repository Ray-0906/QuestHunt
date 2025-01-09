const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password

  profile: {
    avatar: { type: String, default: "" },
    level: { type: Number, default: 1 },
    exp:{ type: Number, default: 0 },
    stats: {
      strength: { type: Number, default: 0 },
      dexterity: { type: Number, default: 0 },
      intelligence: { type: Number, default: 0 },
      charisma: { type: Number, default: 0 },
    },
    current_missions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mission" }],
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Achievement" }]
  },
  streak: {
    mission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mission" },
    current_streak: { type: Number, default: 0 },
    last_completed_date: { type: Date }
  },

},
{timestamps:true});
const User= mongoose.model("User", UserSchema);
module.exports ={User}
