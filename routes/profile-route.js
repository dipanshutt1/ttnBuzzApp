const router=require('express').Router();

const authCheck=(req,res,next)=>{
    if(!req.user){
        //if the user is  not logged in
        res.redirect('/auth/google');
    }
    else{
        //if the user is logged in
        next();
    }
}


router.get('/',authCheck,(req,res)=>{
    res.send('you are logged in ,this is your profile'+req.user.userName);

})

module.exports=router;