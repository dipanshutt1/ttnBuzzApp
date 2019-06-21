const complaint=require('../models/complaint');
const roleData=require('../models/role');

const findAllComplaints=()=>{
    return complaint.find().sort({'issue_date':-1})
}
const changeStatus=(complaintId,status)=>{
    return complaint.update(
        {id:complaintId},{status:status});
}
const findMyComplaint=(email)=>{
    return complaint.find({assigned_email:email}).sort({'issue_date':-1})
}
module.exports={
    findAllComplaints,
    changeStatus,
    findMyComplaint
}