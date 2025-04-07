const express = require('express')
const router = express.Router()
const user = require('../models/user')
const wrapAsync = require('../utlit/wrapAsync')
const passport = require('passport')
const { saveredirecturl } = require('../middleware')
const usercontroller = require('../Controller/user')


router.get('/signup',(req,res)=>{
    res.render('User/signup')
})

router.post('/signup',wrapAsync(usercontroller.signup))

router.get('/login',(req,res)=>{
    res.render('User/login')
})

router.post('/login', 
saveredirecturl,
passport.authenticate('local',{failureRedirect :"/login", failureFlash:true}),
usercontroller.login)

router.get('/logout', usercontroller.logout)

// router.get('/myaccount',listingController.myaccount)

module.exports = router
