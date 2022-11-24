//Database integeration

//1Server and mongodb integeration
//import mongoose
const mongoose=require('mongoose');

//2 state connection string via mongodb integertaion 

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true     //to avoid warnings

})





//3 define bank db model
const User=mongoose.model('User',{
    //schema
    acno:Number,
    username:String,
    password:Number,
    balance:0,
    transaction:[]
})
module.exports={
    User
}