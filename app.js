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
const resolveRoutes=require('./routes/resolve');
const myComplaintRoutes=require('./routes/myComplaint');
const bodyParser=require('body-parser');
const allUserRoutes=require('./routes/allUser');
const userAccountStatus=require('./routes/userStatus');
const cors=require('cors');
const app=express();
require('./config/cloudinary');
require('dotenv').config();


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
app.use('/dashboard',resolveRoutes);
app.use('/dashboard/resolve',myComplaintRoutes);
app.use('/dashboard',allUserRoutes);
app.use('/dashboard/allUser',userAccountStatus);


app.listen(keys.port);
