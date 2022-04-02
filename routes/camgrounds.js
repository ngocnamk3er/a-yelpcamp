const express=require('express')
const router=express.Router()
const {campgroundSchema}=require('../schemas.js')
const catchAsync=require('../utils/catchAsync.js')
const Campground=require('../models/campground.js')
const ExpressError=require('../utils/ExpressError.js')
const isLoggedIn=require('../middleware/middleware').isLoggedIn
const checkUser=require('../middleware/middleware').checkUser
const validateCampground=require('../middleware/middleware').validateCampground
const campgroundsCtrl=require('../controllers/campgrounds')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
router.route('/')
    .get(catchAsync(campgroundsCtrl.index))
    .post(isLoggedIn,validateCampground,catchAsync(campgroundsCtrl.postNew))
    
router.get('/new',isLoggedIn,campgroundsCtrl.getNew) 

router.route('/:id')
    .get(catchAsync(campgroundsCtrl.getId))
    .put(isLoggedIn,checkUser,validateCampground,catchAsync(campgroundsCtrl.putEdit))
    .delete(isLoggedIn,checkUser,catchAsync(campgroundsCtrl.delete))

router.get('/:id/edit',isLoggedIn,catchAsync(campgroundsCtrl.getEdit))

module.exports=router