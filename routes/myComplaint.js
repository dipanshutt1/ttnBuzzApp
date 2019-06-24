const router=require('express').Router();
const resolveOperation=require('../services/resolveOperation');
const Complaint=require('../models/complaint');
const verifyToken=require('../middleware/jwtVerify');
const multer = require('../middleware/multer');

router.get('/myComplaint', verifyToken,(req,res)=>{
    console.log(`hello ${req.user.email}`);
    resolveOperation.findMyComplaint(req.user.email).then(data=>{
        res.send(data);
    })
})

router.post('/myComplaint',multer.any(),verifyToken,(req,res)=>{
    console.log(`hello is hee: ${JSON.stringify(req.body)}`);
    resolveOperation.changeStatus(req.body.issue_id,req.body.statusList).then(data=>{
        console.log('data', data);
        res.send(data);
    })
})

module.exports=router;  