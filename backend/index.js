const express=require('express');
const app=express();
const port=8000;
const {conectDb}=require('./config')


// connection with db
const urll="mongodb://127.0.0.1:27017/solo-leveling"
conectDb(urll);

app.get('/',(req,res)=>{
    res.send('HI from RAY...')
})

app.listen(port,()=>{
    console.log('Lets GOOO..');
})