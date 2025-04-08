require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const Localstrategy = require('passport-local')
const Mongstore = require('connect-mongo')
const flash = require('connect-flash')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static('public'));


const courses = require('./models/course')

const user = require('./routes/user.js')
const User = require('./models/user.js')
const passport = require('passport')

// payment
const paymentRoutes = require("./routes/paymentroutes");


const store = Mongstore.create({
    mongoUrl:"mongodb://localhost:27017/lms",
    crypto:{
        secret: "eduraftisagoodlearningplatform"
    },
    touchAfter : 24*3600
})

store.on("error",()=>{
    console.log("Error in Mongo Session store ",err)
})
const sessionOption = ({
    store,
    secret : "eduraftisagoodlearningplatform",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }
})


app.use(session(sessionOption))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new Localstrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.curUser = req.user
    next()
})
// payment
app.use("/payment", paymentRoutes);

async function main (){
    mongoose.connect("mongodb://localhost:27017/lms");
}

app.get('/', (req,res)=>{
    res.send("Hiii ")
})
app.get('/eduraft',async (req,res)=>{
    const allcontent = await courses.find({})
    res.render('index',{allcontent})
})
app.get('/eduraft/about',(req,res)=>{
    res.render('aboutus')
})
app.get('/eduraft/explorecourse',async (req,res)=>{
    const allcourse = await courses.find({})
    res.render('explorecourse',{allcourse})
})
app.get('/eduraft/myaccount', async(req,res)=>{
    res.render('myaccount')
})

app.get('/eduraft/:id', async (req,res)=>{
    const {id} = req.params
    const findcontent = await courses.findById(id)
    if(!findcontent){
        res.redirect('/eduraft')
    }
    res.render('show',{findcontent})
})

app.use('/',user)
main()
    .then(()=>{
        console.log("Connected to mongoDB")
    })
    .catch(err =>{
        console.log(err)
    })

app.listen(PORT,()=>{
    console.log("Server is running")
})

