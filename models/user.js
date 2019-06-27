const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    userName:{
        type:String
    },
    googleId:{
        type:String
    },
    userImg:{
        type:
        String
    },
    email:{
        type:String
    },
    userRole:{
        type:String
    },
    department:{
        type:String,
        default: 'Developer'
    },
    status:{
        type:String,
        default: 'Activate'
    }
})
const User=mongoose.model('user',userSchema);
module.exports=User;
