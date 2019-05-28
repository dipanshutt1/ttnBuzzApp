const router=require('express').Router();
const passport=require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login');
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile']
})
);

//auth logout
router.get('/logout',(req,res)=>{
    res.send('logging out');
});

//calback route for redirecting from google
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send('logging into callback redirect route');
})

module.exports=router;
