const router=require('express').Router();
const buzzOperation=require('../services/buzzOperations');
const Buzz=require('../models/buzz');
const upload=require('../middleware/multer');
const cloudinary=require('../config/cloudinary');

router.get('/buzz',(req,res)=>{
    buzzOperation.findBuzz().then(data=>{
        res.send(data);
    })
        .catch()
})
router.post('/buzz',upload.single('image'), async (req,res)=>{
    var imageResult ='';
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
    buzzOperation.createBuzz(buzzData).then(res=>{
        console.log("buzzData: ",res)
    }).catch(err=>{
        console.log("error: ",err);
    });
});



module.exports=router;