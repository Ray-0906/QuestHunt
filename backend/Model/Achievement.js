const mongoose=require('mongoose')

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    criteria: { 
      stat: { type: String, enum: ["vitality", "wisdom", "discipline", "creativity"], required: true }, 
      value: { type: Number, required: true } // Threshold for unlocking
    },
    reward: { type: String }, // Badge, points, etc.
    created_at: { type: Date, default: Date.now }
  });
  
  const Achievement = mongoose.model("Achievement", AchievementSchema);
   
  module.exports={Achievement}