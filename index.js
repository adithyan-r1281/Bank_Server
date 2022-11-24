//Server creation


//1 import express
const express = require("express")

//import dataservice
 const dataService =require('./service/dataService')

//import JWT
const jwt=require('jsonwebtoken')


//2 craeate an app using the express
const app=express();

//To parse JSON from req body
app.use(express.json())
//3 create a port number(e.g 3500)

app.listen(3500, ()=>{
    console.log('listening to port 3500');
})

//application specific middleware

const middleware=(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(middleware)
//router specific middleware

const jwtMIddleware=(req,res,next)=>{
    try{
        const token=req.headers['x-access-token'];
        console.log("router specific middleware");
        const data=jwt.verify(token,'secretkey1281')
        console.log(data);
        next();
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please login"
        })
    }
    }

//4 resolving http requests

//get method:to get a data
app.get('/',(req,res)=>{
    res.send('GET METHOD')
});


//post method: to create a data
app.post('/',(req,res)=>{
    res.send("post method")
})

//put method: to update data completly
app.put('/',(req,res)=>{
    res.send("put method")
})

//delete: to delete data
app.delete('/',(req,res)=>{
    res.send("delete method")
})

//post method: to update data partially
app.patch('/',(req,res)=>{
    res.send("patch method")
})

//API calls or request

//Resolving register request
app.post('/register',(req,res)=>{
    console.log(req.body);
dataService.register(req.body.acno,req.body.username,req.body.password)
.then(result=>{
    res.status(result.statusCode).json(result);

})
    // if(result){
    //     res.send('Regitsered Successfully')
    // }else{
    //     res.send('User Already Registered')
    // }
})
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

app.post('/deposit',jwtMIddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);

    })
})

app.post('/withdraw',(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);

    })
})

app.post('/transaction',(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);

    })
})