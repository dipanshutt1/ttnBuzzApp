const router=require('express').Router();
const resolveOperation=require('../services/resolveOperation');
const Complaint=require('../models/complaint');
const verifyToken=require('../middleware/jwtVerify');


router.get('/resolve',verifyToken,(req,res)=>{
    resolveOperation.findAllComplaints(req.body).then(data=>{
        res.send(data);
    })
        .catch(err=>{
            console.log('error',err)
        })

});

router.post('/',(req,res)=>{

});

module.exports=router;