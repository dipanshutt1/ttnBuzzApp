const router=require('express').Router();
const complaintOperation=require('../services/complaintOperations');
const Complaint=require('../models/complaint');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const verifyToken=require('../middleware/jwtVerify');
const nanoid=require('nanoid');
const roleData = require('../models/role');
const nodemailer=require('nodemailer');
const keys=require('../config/keys');
const transporter=require('./nodemailer');

router.get('/complaint',verifyToken,(req,res)=>{
    complaintOperation.findComplaint(req.user.email).then(data=>{
        res.send(data);
    })
        .catch(err=>{
    })
});

router.post('/complaint',verifyToken,upload.single('image'),async (req,res)=>{
    var imageResult='';
    const id=nanoid(6);

    if(req.file){
        await cloudinary.uploader.upload(req.file.path,function (error,result) {
            imageResult=result.secure_url;
        });
    }
    const complaintData=new Complaint({
        department:req.body.department,
        title:req.body.title,
        concern:req.body.concern,
        image_url:req.file ? imageResult : '',
        email:req.user.email,
        name:req.user.userName,
        issue_id:id,
        status:req.body.status,
        assigned_to: roleData.role[req.body.department].name,
        assigned_email: roleData.role[req.body.department].email
    });
    complaintOperation.complaintFire(complaintData).then(complaint=> {
        res.send({data: complaint})
// setup email data with unicode symbols
        let mailOptions = {
            from: keys.nodemailer.user, // sender address
            to: `${complaint.assigned_email},${complaint.email}`, // list of receivers
            subject: `Complaint Status - TTN BUZZ`, // Subject line
            text: `Your Complaint has been locked!`, // plain text body
            html: '<h2>Complaint has been locked!</h2>' +
                    `<h4>Department :- ${complaint.department}</h4>`+
                    `<h4>Issue ID :- ${complaint.issue_id}</h4>`+
                    `<h4>Assigned to :- ${complaint.assigned_to}</h4>`+
                    `<h4>Email :- ${complaint.assigned_email}</h4>`+
                '<button><a href="http://localhost:3000"></a>View Complaint</button>',// html body
        };
        transporter.sendMail(mailOptions);

    }).catch(err=>{
        console.log('error',err);
    });
});

module.exports= router;