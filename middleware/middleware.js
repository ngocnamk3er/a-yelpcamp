const Campground=require('../models/campground')
const Review=require('../models/review')
const campgroundSchema=require('../schemas.js').campgroundSchema
const reviewSchema=require('../schemas.js').reviewSchema
const ExpressError=require('../utils/ExpressError')

const validateCampground=(req,res,next)=>{
    const result=campgroundSchema.validate(req.body)
    // console.log(result)
    if(result.error){
        throw new ExpressError(result.error.message,400)
    }else{
        next()
    }
}

const validateReview=(req,res,next)=>{
    const result=reviewSchema.validate(req.body)
    if(result.error){
        throw new ExpressError(result.error.message,400)
    }else{
        next()
    }
}

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
    req.flash('error',"You must be login !!!")
    req.session.returnUrl=req.originalUrl
    return res.redirect('/users/login')
    }
    next()
}
const checkUser=async(req,res,next)=>{
    const {id}=req.params;
    const campround=await Campground.findById(id).populate('authors')
    const authorString=JSON.stringify(campround.author)
    const authorId=JSON.stringify(req.user._id)
    if(authorString!==authorId){
        req.flash('error','You do not have a permission to do that!!!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
const checkReviewsUser=async(req,res,next)=>{
    const {reviewId,id}=req.params;
    const review=await Review.findById(reviewId).populate('authors')
    const authorString=JSON.stringify(review.author)
    const authorId=JSON.stringify(req.user._id)
    if(authorString!==authorId){
        req.flash('error','You do not have a permission to do that!!!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.validateCampground=validateCampground
module.exports.validateReview=validateReview
module.exports.isLoggedIn=isLoggedIn
module.exports.checkUser=checkUser
module.exports.checkReviewsUser=checkReviewsUser