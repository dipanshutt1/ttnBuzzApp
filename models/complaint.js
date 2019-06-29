const mongoose=require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema=mongoose.Schema;

const complaintSchema=new Schema({
    id:{
        type:String
    },
    status:{
        type:String,
        default:'Open'
    },
    issue_date:{
        type:Date,
        default:Date.now
    },
    department:{
        type:String,
        default:'IT'
    },
    issue_id:{
        type:String
    },
    title:{
        type:String
    },
    concern:{
        type:String
    },
    name:{
        type:String
    },
    image_url:{
        type:String
    },
    assigned_to:{
        type:String
    },
    assigned_email:{
        type: String
    },
    email:{
        type:String
    }
});

const Complaint=mongoose.model('complainx`t',complaintSchema);
module.exports=Complaint;
