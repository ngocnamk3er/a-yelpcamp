const express=require('express');
const router=express.Router()
const User=require('../models/user');
const catchAsync=require('../utils/catchAsync')
const passport=require('passport')
const usersCtrl=require('../controllers/users')

router.get('/register',usersCtrl.getRegister)

router.post('/register',usersCtrl.postRegister)

router.get('/login',usersCtrl.getLogin)

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login',failureFlash: true,successFlash: "Welcome back!!!!"}),usersCtrl.postLogin);

router.get('/logout',usersCtrl.getLogout)

module.exports=router