const router=require('express').Router();
const User=require('../models/user');
const verifyToken=require('../middleware/jwtVerify')
const allUserOperation=require('../services/allUserOperation');

router.get('/allUser',(req,res)=>{
    allUserOperation.fetchUser().then(data=>{
        res.send(data);
    })
        .catch((err)=>{
            console.log(err);
        });
})

module.exports=router;
