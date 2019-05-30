const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const posstSchema=new Schema({
    id:{
        type:String
    },
    category:{
        type:String,
        default:'BUZZ'
    },
    date_created:{
        type:Date,
        defaultL:Date.now()
    },
    header:{
        type:String
    },
    content:{
        type:String
    },
    image_url:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    like:[{
        type:String
    }],
    dislike:[{
        type: String
    }]
})