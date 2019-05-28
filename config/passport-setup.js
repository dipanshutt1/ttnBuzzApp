const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../models/user');

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function to check if the user already exists in the db
    console.log(profile.sub);
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log('user is:',currentUser);
        }
        else{
            //if the user doesn't exist create new user in our db
            new User({
                userName:profile._json.name,
                googleId:profile.id,
                userImg:profile._json.picture,
                email:profile._json.sub
            }).save().then((newUser)=>{
                console.log('new user created'+newUser);
            })
        }
    })
}));
