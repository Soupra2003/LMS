const user = require('../models/user')

module.exports.signup = async (req,res)=>{
    try{
        let{username, email, password} = req.body
        const newuser = new user({email, username})
        let registeredUser = await user.register(newuser, password)
        // console.log(registeredUser)
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err)
            }
            req.flash('success', "Welcome back ")
            res.redirect('/eduraft')
        })
    }catch(err){
        req.flash('error', err.message)
        res.redirect('/signup')
    }
}

module.exports.login = async(req,res)=>{
    req.flash('success', 'Welcome back ')
    let redirecturl = res.locals.redirecturl || '/eduraft'
    res.redirect(redirecturl)
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success", "You are logged out successfully")
        res.redirect('/eduraft')
    })
}