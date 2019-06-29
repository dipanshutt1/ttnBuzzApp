const mongoose=require('mongoose');
const Schema=mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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
