const mongoose=require('mongoose');

async function conectDb(url){
    return mongoose.connect(url).then(()=>{
        console.log("DataBase connceted...");
    }).catch(()=>{
        console.log("failed to connect Database");
    })
}
module.exports={conectDb};