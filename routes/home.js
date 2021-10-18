const express = require('express') ;
const { appendFile } = require('fs');
const routes = express.Router() ;
console.log('Routes has added') ;
const passport = require('../config/passport-local-strategy') ;
const home = require('../controllers/home')
const User = require('../models/user') ;
const coupon = require('../models/coupon') ;




routes.get('/home' , (req, res) => {
    console.log(res.locals.user) ;
    coupon.find((err , data) => {
        res.render('boothome', {
            isAuthenticated : req.isAuthenticated()   ,
            COUPON : data
        }) ;
    })
})
routes.get('/register' , (req , res) =>{
    res.render('bootregister' , {
        title : 'User Registration' ,
    })
})
routes.get('/sign-in' , (req , res) => {
    res.render('bootlogin') ;
})
routes.post('/create' , (req , res) => {
    console.log(req.body) ;
    User.findOne({email : req.body.email} , (err , user) => {
        if(!user) {
            var obj = new User({
                name : req.body.name ,
                email : req.body.email,
                password : req.body.password

            })
            if(req.body.password != req.body.confirmpassword){
                console.log("confirm password is not matching with password")
                return res.redirect('back') ;
            }
            obj.save() ;
            return res.redirect('/sign-in')
        }else{
            console.log('user is already register') ;
            res.redirect('back') ;
        }
    });
});

routes.post('/create-session' ,passport.authenticate(
    'local' ,
    {
        failureRedirect : '/sign-in'}
) , home.createsession) ;

routes.get('/sign-out' , (req , res) => {
    req.logout() ;
    return res.redirect('/home');
})
routes.get('/profile' , (req , res) => {
    console.log(res.locals.user) ;
    return res.render('bootuser' , {
        user : res.locals.user
    }) ;
})
routes.get('/add-voucher' , passport.checkAuthentication , (req , res) => {
    return res.render('bootadd' , {

    }) ;
})
routes.get('/main' , (req , res) => {
    return res.render('bootmain') ;
})













module.exports = routes ;