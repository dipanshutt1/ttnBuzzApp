const router=require('express').Router();
const User=require('../models/user');
const verifyToken=require('../middleware/jwtVerify')
const allUserOperation=require('../services/allUserOperation');

router.get('/allUser',verifyToken,(req,res)=>{
    allUserOperation.fetchUser().then(data=>{
        res.send(data);
    })
        .catch((err)=>{
        });
})

module.exports=router;
