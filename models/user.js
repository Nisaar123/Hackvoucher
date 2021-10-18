const mongoose = require('mongoose') ;

const UserSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true ,
        unique : true
    },
    email : {
        type : String,
        required : true 
    },
    password : {
        type : String , 
        required : true 
    },
    coupen_hosted : {
        type : Number,
        default : 0
    },
    coupen_buyed : {
        type : Number,
        default : 0
    },
    coins : {
        type : Number,
        default : 50
    }
}) ;
const User = mongoose.model('User' , UserSchema) ;
module.exports = User ;