const User=require('../models/user');

const fetchUser=()=>{
    return User.find();
}

module.exports={
    fetchUser
}