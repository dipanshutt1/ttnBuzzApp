const router=require('express').Router();
const userProfile=require('../models/user');
const userProfileOperation=require('../services/userProfileOperation');
const verifyToken=require('../middleware/jwtVerify');

router.get('/userProfile',verifyToken,(req,res)=>{
    userProfileOperation.fetchUserData(req.user.googleId).then(data=>{
        res.send(data);
    })
        .catch(err=>{
            console.log('error',err);
        })
});

module.exports=router;