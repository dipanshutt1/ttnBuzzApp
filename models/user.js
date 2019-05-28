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
        type:String
    },
    email:{
        type:String
    },
    role:{

    }
})
const User=mongoose.model('user',userSchema);
module.exports=User;
