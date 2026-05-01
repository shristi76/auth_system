const mongoose =require('mongoose');


const blacklisttokenschema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"]
    }
},
{
    timestamps:true
}
)
const tokenblacklistmodel=mongoose.model("blacklisttoken",blacklisttokenschema);

module.exports=tokenblacklistmodel