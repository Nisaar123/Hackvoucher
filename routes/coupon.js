const express = require('express') ;
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;
const { deleteOne } = require('../models/user');

routes.post('/create-coupon' , async (req , res) => {
    var obj = await new coupon({
        title : req.body.title,
        store : req.body.store,
        description : req.body.description,
        cardLimit : req.body.cardLimit,
        couponCode : req.body.couponCode,
        user : res.locals.user._id ,
        isFiltered : true 
    })
   obj.save() ;
   res.locals.user.coupen_hosted = res.locals.user.coupen_hosted + 1 ;
   res.locals.user.save() ;
   req.flash('success' , 'Coupon is added successfully') ;
   return res.redirect('back') ;
}) ;
routes.get('/main/:id' , async (req , res) => {
    let COUPON = await coupon.findById(req.params.id)
    res.render('bootmain' , {
        COUPON : COUPON,
        link : "www." + COUPON.store + ".com"
    }) ;
}) ;


routes.get('/buy-coupon/:id' , async (req , res) => {
      let COUPON = await coupon.findById(req.params.id);
        res.locals.user.COUPONS.push(COUPON) ;
        res.locals.user.coins = res.locals.user.coins - COUPON.cardLimit ;
        res.locals.user.coupen_buyed = res.locals.user.coupen_buyed + 1 ;
        COUPON.isPurchaged = true ; 
        let user = await User.findById(COUPON.user) ;
        user.coins = user.coins + COUPON.cardLimit ;
        user.save() ;
        COUPON.save();
        res.locals.user.save() ;
       return res.redirect('/home') ;
   }) ;
    


routes.post('/filter' , async (req , res) => {
    console.log(req.body) ;
    for await(var i of coupon.find()) {
        // console.log(i.store) ;
        // console.log(i.isFiltered) ;
        
        for await (var j of req.body.companyName) {
            if(i.store !== j) {
                i.isFiltered = false ;
                i.save() ;
                console.log(j) ;
            }else{
               i.isFiltered = true ;
               i.save() ;
            }
        }
        // console.log(i.store) ;
        // console.log(i.isFiltered) ;
      }
      res.redirect('back') ;
    
})

module.exports = routes ;