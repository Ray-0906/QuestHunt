const { required } = require('joi');
const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    characterLevel: {
        type: Number,
        required: true,
        default: 1
      },
      totalXP: {
        type: Number,
        required: true,
        default: 0
      },
      stats: {
        vitality: {
          level: { type: Number, required: true, default: 1 },
          currentXP: { type: Number, required: true, default: 0 }
        },
        wisdom: {
          level: { type: Number, required: true, default: 1 },
          currentXP: { type: Number, required: true, default: 0 }
        },
        discipline: {
          level: { type: Number, required: true, default: 1 },
          currentXP: { type: Number, required: true, default: 0 }
        },
        creativity: {
          level: { type: Number, required: true, default: 1 },
          currentXP: { type: Number, required: true, default: 0 }
        }
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})

const User=mongoose.model('User',userSchema);
module.exports={User};