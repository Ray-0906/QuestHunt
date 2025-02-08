require('dotenv').config();


const express=require('express');
const app=express();
const port=8000;


const {connectDb}=require('./config')
const userRoute=require('./routes/user');
const infoRoute=require('./routes/info')
const missionRoute =require('./routes/mission')
const {authenticateToken}=require('./Middleware/auth')
const cors = require('cors');

// connection with db
const urll=process.env.MONGO_URL ;
connectDb(urll);

//cors tackling
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//routes

app.use('/user',userRoute)
app.use('/add',authenticateToken,missionRoute);
app.use('/get',authenticateToken,infoRoute);

app.get('/',(req,res)=>{
    res.send('HI from RAY...')
})



//listenting to port 
app.listen(port,()=>{
    console.log('Lets GOOO..');
})