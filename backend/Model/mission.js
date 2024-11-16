const { required, ref } = require('joi');
const mongoose=require('mongoose');

const missoinSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:string,
        required:true,
    },
    quests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Quest',
            required:true
        }
    ],
    durationDays: {
        type: Number,
        required: true,
        default: 7 // Default to one week if not specified
      },
      dailyStreakReward: {
        type: Number,
        required: true,
        default: 15 // Default to 0 if no bonus is specified
      },
      rewardXP: {
        type: Number,
        required: true,
        default: 100
      },
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
      ,
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})

missoinSchema.pre("save",(next)=>{
    this.updatedAt=Date.now();
    next()
    })

const Mission=mongoose.model('Mission',missoinSchema);

module.exports={Mission};