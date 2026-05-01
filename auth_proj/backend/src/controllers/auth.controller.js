const userModel=require('../models/user.model');
/**
 * 
 *@name registerusercontroller
 @description register a new user ,expects username,email and password
 @access public
 */
const tokenblacklistmodel=require('../models/blacklist.model')

const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
async function registerusercontroller(req,res)
{
try{
const {username,email,password}=req.body;
if(!username || !email || !password)
{
    return res.status(400).json({
        message:"please provide username ,email and password"
    })
}
//agr user nai sara field dalaa pr wo user already exist krta hai
// $or sai multiple conditions de sktai hai  yeh array maagta hai
const isuseralreadyexist=await userModel.findOne({
$or:[{username},{email}]
})

if(isuseralreadyexist)
{
    return res.status(400).json({
        message:"account already exist with this email and username"
    })
}

//agr user exsit nahi krta toh uskkoo register karoo pr sabsai pehlai hum password ko bcrypt krtai hai
// npm i bcryptjs jsonwebtoken cookie-parser 
const hash=await bcrypt.hash(password,10)
const user=await userModel.create({
    username,email,
    password:hash
})
const token=jwt.sign(
   { id:user._id,username:user.username},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
)

//aab is token ko cookies mai set krroo
res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});
res.status(201).json({
    message:"user is registered successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
} catch(err) {
  console.error(err);
  res.status(500).json({message: "Registration failed", error: err.message});
}
}

//login controller
/**
 * 
 * @name loginusercontroller
 * @description login a user ,expect email and password in the request body
 * @access Public 
 */

async function loginusercontroller(req,res)
{
try{
const {email,password}=req.body
//jo emsil mila us email ka user exist krta hai wo check krna
const user=await userModel.findOne({
    email
})

if(!user)
{
    return res.status(400).json({
        message:"invalid email or password"
    })
}
//agr email address sai koi user exist krta hai toh aab uska password check kroo

const ispasswordvalid= await bcrypt.compare(password,user.password)
if(!ispasswordvalid)
{
    return res.status(400).json({
        message:"invalid email or password"
    })
}

//agr password valid hota hai toh agai badhoo
const token=jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)
//save token on cookie
res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});
res.status(200).json({
    message:"user logged in successfully",
    user:{
        _id:user._id,
        username:user.username,
        email:user.email
    }

})
} catch(err) {
  console.error(err);
  res.status(500).json({message: "Login failed", error: err.message});
}
}

async function logoutusercontroller(req,res)
{
try{
    const token=req.cookies.token;

    if(token)
    {
        await tokenblacklistmodel.create({token})

    }
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out successfully"
    })
} catch(err) {
  console.error(err);
  res.status(500).json({message: "Logout failed", error: err.message});
}
}


async function getmecontroller(req,res)
{
try{
    const user=await userModel.findById(req.user.id);
    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            _id:user._id,
            username:user.username,
            email:user.email
        }
    })
} catch(err) {
  console.error(err);
  res.status(500).json({message: "Failed to fetch user details", error: err.message});
}
}


module.exports={registerusercontroller,loginusercontroller,logoutusercontroller,getmecontroller}