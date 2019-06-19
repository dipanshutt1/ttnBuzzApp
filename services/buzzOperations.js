const buzz=require('../models/buzz');


createBuzz=(buzz)=>{
    return buzz.save();
}

findBuzz=()=>{
    return buzz.find().sort({date_created:-1});
}

module.exports={
    createBuzz,
    findBuzz
}