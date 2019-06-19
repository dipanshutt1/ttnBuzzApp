const express=require('express');
const authRoutes=require('./routes/auth');
const profileRoutes=require('./routes/profile');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');
const buzzRoutes=require('./routes/buzz');
const complaintRoutes=require('./routes/complaint');
const userProfileRoutes=require('./routes/userProfile');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
require('./config/cloudinary');

//setting up the view engine
app.set('view engine','ejs');

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey]
// }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connecting mongoose
mongoose.connect('mongodb://localhost:27017/ttn_buzz_app',{useNewUrlParser:true});
//setup routes

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/dashboard',buzzRoutes);
app.use('/dashboard',complaintRoutes);
app.use('/dashboard',userProfileRoutes);

app.listen(8080,()=>{
    console.log('server started at port number 8080');
});
