const router=require('express').Router();
const resolveOperation=require('../services/resolveOperation');
const Complaint=require('../models/complaint');
const verifyToken=require('../middleware/jwtVerify');

router.get('/myComplaint',verifyToken,(req,res)=>{
    console.log(`hello ${req.user.email}`);
    resolveOperation.findMyComplaint(req.user.email).then(data=>{
        res.send(data);
    })
})

module.exports=router;