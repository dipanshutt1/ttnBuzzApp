const User=require('../models/user');

const fetchUser=()=>{
    return User.find();
}
const statusUpdate=(userId,status)=>{
    return User.updateOne({
        googleId:userId
    },{
        status:status
    })
};
module.exports={
    fetchUser,
    statusUpdate
}