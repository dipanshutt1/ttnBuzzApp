const buzz=require('../models/buzz');


createBuzz=(buzz)=>{
    return buzz.save();
}

findBuzz=(skipValue)=>{
    console.log('qqq',skipValue);
    return buzz.find().sort({date_created:-1}).limit(5).skip(skipValue);
}

module.exports={
    createBuzz,
    findBuzz
}