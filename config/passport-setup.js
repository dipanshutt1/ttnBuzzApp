const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const keys=require('./keys');
const User=require('../models/user');
var roleData=require('../models/role');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
})

passport.use(new GoogleStrategy({
    //options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function to check if the user already exists in the db
    console.log(profile);
    var role;
    console.log("role is ",roleData.role.IT);
    if(profile._json.email===roleData.role.HR.email){
        role='HR'
    }
    else if(profile._json.email===roleData.role.IT.email){
        role='IT'
    }
    else if(profile._json.email===roleData.role.INFRASTRUCTURE.email){
        role='INFRASTRUCTURE'
    }
    else{
        role='USER'
    }
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log('user is:',currentUser);
            done(null,currentUser);
        }
        else{
            //if the user doesn't exist create new user in our db
            new User({
                userName:profile._json.name,
                googleId:profile.id,
                userImg:profile._json.picture,
                email:profile._json.email,
                userRole:role
            }).save().then((newUser)=>{
                console.log('new user created'+newUser);
                done(null,newUser);
            })
        }
    })
}));
