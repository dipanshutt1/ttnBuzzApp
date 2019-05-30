const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const complaintSchema=new Schema({
    id:{
        type:String
    },
    status:{
        type:String
    },
    issue_date:{
        type:Date
    },
    department:{
        type:String
    },
    issue_id:{
        type:String
    },
    title:{
        type:String
    },
    conern:{
        type:String
    },
    user:{
        type:String
    },
    image_url:{
        type:String
    },
    assigned_to:{
        type:String
    },
    email:{
        type:String
    }
})
