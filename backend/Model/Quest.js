
const mongoose=require('mongoose')

const QuestSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        stat:{
            type:String,
            required:true,  
        },
        exp:{
            type: Number,
            required: true,
            default: 10
        },
    }
)

const Quest=mongoose.model("Quest",QuestSchema);

module.exports={Quest}