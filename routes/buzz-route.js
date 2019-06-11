const router=require('express').Router();
const buzzOperation=require('../services/buzzOperations');
const Buzz=require('../models/buzz');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');

router.post('/buzz',upload.single('image'),(req,res)=>{
    const formData=req.body;
    console.log(formData)
    const imageData=req.file;
    if(imageData){
        //cloudinary.uploader.upload("my_image.jpg", function(error, result) {console.log(result, error)});

    }

    const buzzData=new Buzz({
        content:req.body.buzzContent,
        category:req.body.category
    })
    buzzOperation.createBuzz(buzzData).then(res=>{
        console.log("buzzData: ",res)
    }).catch(err=>{
        console.log("error: ",err);
    });
});



module.exports=router;