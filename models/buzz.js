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
        default:Date.now()
    },
    // header:{
    //     type:String
    // },
    content:{
        type:String
    },
    image_url:{
        type:String
    },
    // to check individual feed
    // name:{
    //     type:String
    // },
    // email:{
    //     type:String
    // },
    like:[{
        type:String
    }],
    dislike:[{
        type: String
    }]
})

const Buzz=mongoose.model('buzz',buzzSchema);
module.exports=Buzz;