const User=require('../models/user');

fetchUserData=(userId)=>{
    return User.findOne({
        googleId:userId
    })
}

module.exports={
    fetchUserData
}