const express=require('express')
const app=express()
const path=require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session=require('express-session')
const flash=require('connect-flash')
const ExpressError=require('./utils/ExpressError.js')
const campgroundRoutes=require('./routes/camgrounds')
const reviewRoutes=require('./routes/reviews')
const userRoutes=require('./routes/users')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("OK")
});
mongoose.set('useFindAndModify', false);
// const db=mongoose.connection;
// db.on("error",console.error.bind(console,"connection error:"));
// db.once("open",()=>{
//     console.log("Database connected")
// })

app.set('view engine','ejs')
app.engine('ejs', ejsMate);
app.set('views',path.join(__dirname,'views'))
app.use(methodOverride('_method'))
const passport=require('passport')
const LocalStrategy = require('passport-local')
const User=require('./models/user')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{
    res.render('home')
})

const sessionConfig={
    secret:"secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires: Date.now()+1000*60*60*24*7,
        maxAges: 1000*60*60*24*7
        // what is the expires and maxAges ????
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser=req.user
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    // console.log(req.user)
    next()
    
})


app.use('/users',userRoutes)

app.use('/campgrounds',campgroundRoutes)

app.use('/campgrounds/:id/reviews',reviewRoutes)

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not found',404))
    // throw new Error('Page not found',404)
})

app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
    if(!err.message) err.message='Oh boy, some thing went wrong'
    res.status(statusCode).render('error',{err})
})
app.listen(process.env.PORT,()=>{
    console.log("Listen in port 3000")
    console.log(process.env.PORT)
})