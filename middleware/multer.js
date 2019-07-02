const multer=require('multer');
const path=require('path');
const keys=require('../config/keys');


const storage=multer.diskStorage({});
const maxFileSize=(3*1024*1024);

const limitFileType=(req,file,cb)=>{
    const ext=path.extname(file.originalname).toLowerCase();
    if(ext !=='.png' && ext !=='.jpg' && ext!=='.jpeg')
    {
        return cb(new Error('only .png ,.jpg are allowed'));
    }
    return cb(null,true);
    };

const upload=multer({
    fileSize:maxFileSize,
    fileFilter:limitFileType,
    storage
    })

module.exports=upload;
