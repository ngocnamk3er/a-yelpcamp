const express=require('express');
const router = express.Router({ mergeParams:true });
const catchAsync=require('../utils/catchAsync.js')
const Campground=require('../models/campground.js')
const Review=require('../models/review')
const reviewsCtrl=require('../controllers/reviews')

const {validateReview,isLoggedIn,checkReviewsUser}=require('../middleware/middleware')

router.post('/',isLoggedIn,validateReview,catchAsync(reviewsCtrl.postReview))

router.delete('/:reviewId',isLoggedIn,checkReviewsUser,catchAsync(reviewsCtrl.deleteReview))

module.exports=router