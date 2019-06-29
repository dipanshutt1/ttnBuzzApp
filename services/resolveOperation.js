const complaint=require('../models/complaint');
const roleData=require('../models/role');

const findAllComplaints=()=>{
    return complaint.find().sort({'issue_date':-1})
}
const changeStatus=(complaintId,status)=>{
    console.log(`called for status: ${status} and complaint id:${complaintId}`);
    return complaint.findOneAndUpdate(
        {issue_id:complaintId},{$set:{status:status}}, {upsert:true, new: true});
}
const findMyComplaint=(email)=>{
    return complaint.find({assigned_email:email}).sort({'issue_date':-1})
}
module.exports={
    findAllComplaints,
    changeStatus,
    findMyComplaint
}