const complaint= require('../models/complaint');

complaintFire=(complaint)=>{
    return complaint.save();
}

findComplaint=(email)=>{
    return complaint.find({email}).sort({'issue_date': -1})
}

module.exports={
    complaintFire,
    findComplaint
}