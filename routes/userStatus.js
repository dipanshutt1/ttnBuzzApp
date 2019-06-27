const router=require('express').Router();
const User=require('../models/user');
const verifyToken=require('../middleware/jwtVerify')
const multer=require('../middleware/multer');
router.post('/accountStatus',multer.any(),(req,res)=>{
    allUserOperation.statusUpdate(req.body.googleId, req.body.status).then(data=>{
        res.send(data);
    })
        .catch(err=>{
                console.log(err)
            }
        )
})

const allUserOperation=require('../services/allUserOperation');

module.exports=router;
