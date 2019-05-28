const express=require('express');
const authRoutes=require('./routes/auth-routes');
const passportSetup=require('./config/passport-setup');
const mongoose=require('mongoose');
const app=express();

//setting up the view engine
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('home');
});
//connecting mongoose
mongoose.connect('mongodb://localhost:27017/ttn_buzz_app',{useNewUrlParser:true});
//setup routes
app.use('/auth',authRoutes);

app.listen(8080,()=>{
    console.log('server started at port number 8080');
});
