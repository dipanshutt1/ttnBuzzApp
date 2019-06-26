const router=require('express').Router();
const resolveOperation=require('../services/resolveOperation');
const Complaint=require('../models/complaint');
const verifyToken=require('../middleware/jwtVerify');
const multer = require('../middleware/multer');
const nodemailer=require('nodemailer');
const transporter=require('./nodemailer');


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
        // let mailOptions = {
        //     from: `${Complaint.assigned_to}`, // sender address
        //     to: `${Complaint.assigned_email}`, // list of receivers
        //     subject: `Complaint Status - TTN BUZZ`, // Subject line
        //     text: `Your Complaint has been changed to ${Complaint.status}!`, // plain text body
        //     html: '<h2>Your Complaint has been locked!</h2>' +
        //         '<h3><a href="http://localhost:3000">click here</a> to check</h3>',// html body
        // };
        // transporter.sendMail(mailOptions);
        res.send(data);

    })
        .catch(err=>{
            console.log(err);
        })
})

module.exports=router;
