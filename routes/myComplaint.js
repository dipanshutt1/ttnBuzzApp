const router=require('express').Router();
const resolveOperation=require('../services/resolveOperation');
const Complaint=require('../models/complaint');
const verifyToken=require('../middleware/jwtVerify');
const multer = require('../middleware/multer');
const nodemailer=require('nodemailer');
const transporter=require('./nodemailer');
const keys=require('../config/keys');


router.get('/myComplaint', verifyToken,(req,res)=>{
    console.log(`hello ${req.user.email}`);
    resolveOperation.findMyComplaint(req.user.email).then(data=>{
        res.send(data);
    })
})

router.post('/myComplaint',multer.any(),verifyToken,(req,res)=>{
    console.log(`hello is hee: ${JSON.stringify(req.body)}`);
    resolveOperation.changeStatus(req.body.issue_id,req.body.statusList).then(data=>{
        console.log('databdbdbdbdb', data);
        let mailOptions = {
            from: keys.nodemailer.user, // sender address
            to: `${data.assigned_email},${data.email}`,  //senders emails
            subject: `Complaint Status - TTN BUZZ`, // Subject line
            text: `Your Complaint has been changed to !`, // plain text body
            html: '<h2>Complaint status has been changed!</h2>' +
                `<h4>Department :- ${data.department}</h4>`+
                `<h4>Issue ID :- ${data.issue_id}</h4>`+
                `<h4>Assigned to :- ${data.assigned_to}</h4>`+
                `<h4>Email :- ${data.assigned_email}</h4>`+
                '<button><a href="http://localhost:3000"></a>View Complaint</button>',// html body

        };
        transporter.sendMail(mailOptions);
        res.send(data);

    })
        .catch(err=>{
            console.log(err);
        })
})

module.exports=router;
