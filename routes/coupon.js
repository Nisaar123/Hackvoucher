const express = require('express') ;
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;

routes.post('/create-coupon' , (req , res) => {
    var obj = new coupon({
        title : req.body.title,
        store : req.body.store,
        description : req.body.description,
        cartLimit : req.body.cartLimit,
        couponCode : req.body.couponCode,
        user : res.locals.user._id
    })
   obj.save() ;
   console.log(res.locals.user) ;
   return res.redirect('back') ;
}) ;
routes.get('/main/:id' , (req , res) => {
    console.log(req.params) ;
    return res.render('bootmain') ;
})









module.exports = routes ;