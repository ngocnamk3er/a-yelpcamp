const User= require('../models/user')

module.exports.getRegister=(req,res)=>{
    res.render('users/register')
}

module.exports.postRegister=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const user=new User({username,email})
        await User.register(user,password)
        req.flash('success','Welcome to Yelp Camp!!!')
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/campgrounds');
        });
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/users/register')
    }
}

module.exports.getLogin=(req,res)=>{
    res.render('users/login')
}

module.exports.postLogin=(req,res)=>{
    if(req.session.returnUrl){
        const returnUrl=req.session.returnUrl
        req.session.returnUrl=null
        return res.redirect(returnUrl)
    }
    res.redirect('/campgrounds')
}

module.exports.getLogout=(req,res)=>{
    req.logout()
    req.flash('success','Goodbye !!!')
    res.redirect('/campgrounds')
}