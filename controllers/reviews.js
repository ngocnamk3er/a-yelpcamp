const Review=require('../models/review')
const Campground=require('../models/campground')
module.exports.postReview=async(req,res)=>{
    const campground=await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author=req.user._id
    campground.reviews.push(review)
    await campground.save()
    await review.save()
    req.flash("success","Created a new review")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview=async(req,res)=>{
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{ $pull: { reviews: {_id:reviewId} }})
    await Review.findByIdAndDelete(reviewId)
    req.flash("success","Successfully deleted review")
    res.redirect(`/campgrounds/${id}`)
}