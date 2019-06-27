const cloudinary = require('cloudinary').v2;
const keys=require('./keys');

cloudinary.config({
    cloud_name:keys.cloudinary.cloud_name,
    api_key:keys.cloudinary.api_key,
    api_secret: keys.cloudinary.secret_key
})

module.exports=cloudinary;