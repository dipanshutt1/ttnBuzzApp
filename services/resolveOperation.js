const complaint=require('../models/complaint');
const roleData=require('../models/role');

const findAllComplaints=()=>{
    return complaint.find();
}
const changeStatus=(complaintId,status)=>{
    return complaint.update(
        {id:complaintId},{status:status});
}
module.exports={
    findAllComplaints,
    changeStatus
} 