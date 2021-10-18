const mongoose = require('mongoose') ;
const User = require('../models/user')

const couponSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    store :{
        type : String,
        required : true 
    },
    description : {
        type : String,
        required : true
    },
    cartLimit : {
        type : Number,
        required : true 
    },
    couponCode : {
        type : String,
        required : true 
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const coupon = mongoose.model('coupon' , couponSchema) ;
module.exports = coupon ;