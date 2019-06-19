const router=require('express').Router();
const complaintOperation=require('../services/complaintOperations');
const Complaint=require('../models/complaint');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const verifyToken=require('../middleware/jwtVerify');
const nanoid=require('nanoid');
const roleData = require('../models/role');


router.get('/complaint',verifyToken,(req,res)=>{
    complaintOperation.findComplaint(req.user.email).then(data=>{
        res.send(data);
    })
        .catch(err=>{
        console.log('error',err)
    })
});

router.post('/complaint',verifyToken,upload.single('image'),async (req,res)=>{
    // console.log(`body: ${JSON.stringify(req.body)}`)
    var imageResult='';
    const id=nanoid(6);

    if(req.file){
        await cloudinary.uploader.upload(req.file.path,function (error,result) {
            imageResult=result.secure_url;
            console.log('imageResult',imageResult)
        });
    }
    console.log(`helllo role: ${roleData.role[req.body.department]} ${req.body.department}`)
    const complaintData=new Complaint({
        department:req.body.department,
        title:req.body.title,
        concern:req.body.concern,
        image_url:req.file ? imageResult : '',
        email:req.user.email,
        issue_id:id,
        status:req.body.status,
        assigned_to: roleData.role[req.body.department]
    });
    complaintOperation.complaintFire(complaintData).then(complaint=>{
        console.log('complaintData',complaint);
        res.send({data: complaint})
    }).catch(err=>{
        console.log('error',err);
    });
});

module.exports=router;