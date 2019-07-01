const mongoose=require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema=mongoose.Schema;

const buzzSchema=new Schema({
    id:{
        type:String
    },
    category:{
        type:String,
        default:'Activity',
        require:true
    },
    date_created:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String,
        required:true
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
        emailId: {type: String}
    }],
    dislike:[{
        emailId: {type: String}
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