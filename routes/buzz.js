const router=require('express').Router();
const buzzOperation=require('../services/buzzOperations');
const Buzz=require('../models/buzz');
const User=require('../models/user');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const verifyToken=require('../middleware/jwtVerify');

router.get('/buzz/:skip',verifyToken,(req,res)=>{
    buzzOperation.findBuzz(parseInt(req.params.skip)).then(data=>{
        res.send(data);
    })
        .catch(err=>{
            res.status(400).send(err)
        });
});

router.post('/buzz',verifyToken, upload.single('image'), async (req,res)=>{
    var imageResult ='';
    if(req.file){
        await cloudinary.uploader.upload(req.file.path, function(error, result) {
            imageResult = result.secure_url;
        });

    }
    const buzzData=new Buzz({
        content:req.body.buzzContent,
        category:req.body.category,
        imageUrl:req.file ? imageResult : '',
        posted_by: req.user.userName,
        thumbnail: req.user.userImg
    })
    buzzOperation.createBuzz(buzzData).then(result=>{
        res.send({message:"Success", result})
    }).catch(err=>{
        res.status(400).send(err)
    });
});


router.patch('/buzz/like', verifyToken, upload.any(),  async (req, res) => {
    const buzzData = await buzzOperation.fetchBuzzById(req.body.buzzId);
    let emailId = req.user.email;
    const { like, dislike} = buzzData;
    status = like.find(item=>{
        return item.emailId === emailId;
    })

    buzzOperation.likeBuzz(
        req.body.buzzId,
        req.user.email,
        status,
    ).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err);
    })
});

router.patch('/buzz/dislike',verifyToken, upload.any(), async (req, res) => {
    const buzzData = await buzzOperation.fetchBuzzById(req.body.buzzId);
    const { like, dislike } = buzzData;
    let emailId = req.user.email;
    status = dislike.find(item=>{
        return item.emailId === emailId;
    });


    buzzOperation.dislikeBuzz(
        req.body.buzzId,
        req.user.email,
        status
    ).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(404).send(err);
    })
});


module.exports=router;