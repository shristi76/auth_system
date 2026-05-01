const express =require('express');
const authRouter=require('./routes/auth.routes');

const cors =require("cors");

const app=express();
app.use(express.json());

app.use(cors({
    origin:["http://localhost:5173",
    "https://authsystem5.vercel.app"],
    credentials:true
}))

const cookieParser=require("cookie-parser")
app.use(cookieParser())
//prefix lagana padta hai auth ki api ko access krnai kai liye
app.use('/api/auth',authRouter)
module.exports=app;

