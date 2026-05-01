const mongoose=require('mongoose');

//define the schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exist"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
//ek model banaoo jismai bataoo user ka data kis table mai store ho raha hai or us table ka kya schema hona chahiya

const userModel=mongoose.model('user',userSchema);
//export the model
module.exports=userModel;