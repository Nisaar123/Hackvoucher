const express = require('express') ;
const { appendFile } = require('fs');
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const home = require('../controllers/home')
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;
const { X509Certificate } = require('crypto');


routes.get('/home' , async (req, res) => {
let data = await coupon.find({isPurchaged: false , isFiltered : true}) ;
    res.render('boothome', {
        isAuthenticated : req.isAuthenticated()   ,
        COUPON : data
    }) ;
})
routes.get('/register' , (req , res) =>{
    res.render('bootregister' , {
        title : 'User Registration' ,
    })
})
routes.get('/sign-in' , (req , res) => {
    res.render('bootlogin') ;

})
routes.post('/create' , async (req , res) => {
    console.log(req.body) ;
    let user = await User.findOne({email : req.body.email});
    if(user){
        req.flash('error' , 'user is already exist') ;
        return res.redirect('back') ;
    }
    if(!user) {
        var obj = new User({
            name : req.body.name ,
            email : req.body.email,
            password : req.body.password,
            COUPONS : []

        })
        if(req.body.password != req.body.confirmpassword){
            req.flash('error' , "confirm password is not matching with password") ;
            return res.redirect('back') ;
        }
        obj.save() ;
        req.flash('success' , 'Successfully register , WELCOME TO HACKVOUCHER') ;
        return res.redirect('/sign-in')
    }else{
        console.log('user is already register') ;
        res.redirect('back') ;
    }
});

routes.post('/create-session' ,passport.authenticate(
    'local' ,
    {
        failureRedirect : '/sign-in'}
) ,  (req , res) => {
    req.flash('success' , 'Logged in Successfully') ;
     return res.redirect('/home') ;
 }) ;

routes.get('/sign-out' , (req , res) => {
    req.logout() ;
    req.flash('success' , 'You have logged out') ;
    return res.redirect('/home');
})
routes.get('/profile' , async (req , res) => {
        var x = new Array();
    for(let i of res.locals.user.COUPONS) {
         let COUPON = await coupon.findById(i) ;
         x.push(COUPON) ;
    }
    console.log(x) ;
    return res.render('bootuser' , {
        user : res.locals.user,
        x : x
    }) ;
})
routes.get('/add-voucher' , passport.checkAuthentication , (req , res) => {
    return res.render('bootadd' , {
         
    }) ;
})
routes.get('/main' , (req , res) => {
    return res.render('bootmain') ;
})



routes.get('/x' , (req , res) => {
    return res.redirect("www.facebook.com") ;
})









module.exports = routes ;