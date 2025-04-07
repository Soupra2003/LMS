const listing = require('./models/course')
// const Review = require('./models/review')

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirecturl = req.originalUrl
        // console.log(req.session.redirecturl)
        req.flash('error','You are not Logged in')
        return res.redirect('/login')
    }
    next()
}

module.exports.saveredirecturl = (req,res,next) =>{
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl
    }
    next()
}


