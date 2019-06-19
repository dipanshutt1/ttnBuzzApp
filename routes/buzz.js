const router=require('express').Router();
const buzzOperation=require('../services/buzzOperations');
const Buzz=require('../models/buzz');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');
const verifyToken=require('../middleware/jwtVerify');

router.get('/buzz',verifyToken,(req,res)=>{
    buzzOperation.findBuzz().then(data=>{
        res.send(data);
    })
        .catch(err=>{
            console.log('error',err)
        });
});

router.post('/buzz',verifyToken,upload.single('image'), async (req,res)=>{
    var imageResult ='';
    console.log('hi',req.body);
    if(req.file){
        await cloudinary.uploader.upload(req.file.path, function(error, result) {
            imageResult = result.secure_url;
            console.log('imageResult', imageResult)
        });

    }
    const buzzData=new Buzz({
        content:req.body.buzzContent,
        category:req.body.category,
        imageUrl:req.file ? imageResult : ''
    })
    buzzOperation.createBuzz(buzzData).then(result=>{
        console.log("buzzData: ",result)
        res.send({message:"Success", result})
    }).catch(err=>{
        console.log("error: ",err);
    });
});



module.exports=router;