const router=require('express').Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');
//auth login
router.get('/login',(req,res)=>{
    res.render('login');
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
})
);

//auth logout
router.get('/logout',(req,res)=>{
    res.send('logging out');
});


//calback route for redirecting from google
router.get('/google/redirect',passport.authenticate('google', {
    failureRedirect: '/profile/'
}),(req,res)=>{
    // res.send(req.user);
    jwt.sign(req.user.toJSON(),keys.session.cookieKey,{expiresIn:'10h'},
        function (err,token) {
            if(err){
                console.log('err: ${err}');
            }
            else{
                console.log(`token:${token}`);
                res.redirect(`http://localhost:3000/token?q=${token}`);
            }

        });
    // res.redirect('/profile/');
})

module.exports=router;
