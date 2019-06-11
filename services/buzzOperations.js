const buzz=require('../models/buzz');


createBuzz=(buzz)=>{
    return buzz.save();
}

findBuzz=(buzz)=>{
    return buzz.find({});
}

module.exports={
    createBuzz,
    findBuzz
}