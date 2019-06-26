const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const buzzSchema=new Schema({
    id:{
        type:String
    },
    category:{
        type:String,
        default:'BUZZ',
        require:true
    },
    date_created:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
    },
    imageUrl:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    like:[{
        type:String
    }],
    dislike:[{
        type: String
    }],
    posted_by:{
        type:String
    },
    thumbnail:{
        type:String
    }
})

const Buzz=mongoose.model('buzz',buzzSchema);
module.exports=Buzz;