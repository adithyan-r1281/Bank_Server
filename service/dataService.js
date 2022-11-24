
//import JWT
const jwt=require('jsonwebtoken')

//import db.js
const db=require('./db.js')

userDetails= {//object of objects
    1000: { acno: 1000, username: 'Jees', password: 1000, balance: 1000,transaction:[] },
    1001: { acno: 1000, username: 'Amal', password: 1001, balance: 1000,transaction:[]  },
    1002: { acno: 1000, username: 'Sarath', password: 1002, balance: 1000 ,transaction:[] }
  }



 const register=(acno, username, password)=> {

  return db.User.findOne({acno}) //port 27017, backend port 3500
  .then(user=>{
    if(user){
      return {
        statusCode:401,
        status:false,
        message:"User Already Exixt"
      }
    }
    else{
      const newUser=new db.User({
        acno,
        username,
        password,
        balance:0,
        transaction:[]
      }
      )
      newUser.save()//to store data in mongoDb
      return {
        statusCode:200,
        status:true,
        message:"Register Successfully"
      }
    }
  })

    // if (acno in userDetails) {
    //   return {
    //     statusCode:401,
    //     status:false,
    //     message:"User Already Exixt"
    //   }
    // }
    // else {
    //   userDetails[acno] = {
    //     acno,
    //     username,
    //     password,
    //     balance: 0,
    //     transaction:[] 
    //   }
    //   console.log(userDetails);
    //   return {
    //     statusCode:200,
    //     status:true,
    //     message:"Register Successfully"
    //   }
    // }
  }
const  login=(acno, password)=> {

  return db.User.findOne({acno,password})
  .then(user=>{
    if(user){
      currentUser = user.username
      currentAcno=acno;
      const token=jwt.sign({currentAcno:acno},'secretkey1281') //can give anything instead of secretkey1281
      return  {
        statusCode:200,
        status:true,
        message:"Login Success",
        currentAcno,
        currentUser,
        token
      }
    }
    else {
      return {
        statusCode:401,
        status:false,
        message:" Incorrect Password or Username"
      }
      
    }
  })

    // if (acno in userDetails) {
    //   if (password == userDetails[acno].password) {
    //     currentUser = userDetails[acno]['username']
    //     currentAcno=acno;
    //     const token=jwt.sign({currentAcno:acno},'secretkey1281') //can give anything instead of secretkey1281
    //     return  {
    //       statusCode:200,
    //       status:true,
    //       message:"Login Success",
    //       currentAcno,
    //       currentUser,
    //       token
    //     }
    //   }
    //   else {
    //     return {
    //       statusCode:401,
    //       status:false,
    //       message:"Password Error"
    //     }
        
    //   }

    // }
    // else {
     
    //   return {
    //     statusCode:401,
    //     status:false,
    //     message:"invalid user"
    //   }
    // }

  }

 const deposit=(acno, password, amt)=> {
  var amount = parseInt(amt)
  return db.User.findOne({acno,password})
  .then(user=>{
    if(user){
      user.balance += amount
     user.transaction.push({
        type:'Credit',
        amount
      })
      user.save()

      return {
        statusCode:200,
        status:true,
        message:`${amount} is credited balance is ${user.balance}`
      }
    }
    else {
      return{
        statusCode:401,
        status:false,
        message:"invalid username or password"
      }
    }
  })
  //   var amount = parseInt(amt)
  //   if (acno in userDetails) {
  //     if (pswd == userDetails[acno]['password']) {
  //       userDetails[acno]['balance'] += amount
  //       userDetails[acno]['transaction'].push({
  //         type:'Credit',
  //         amount
  //       })
  //       console.log(userDetails);

  //       return {
  //         statusCode:200,
  //         status:true,
  //         message:`${amount} is credited balance is ${userDetails[acno]['balance']}`
  //       }
  //     }
  //     else {
  //       return{
  //         statusCode:401,
  //         status:false,
  //         message:"invalid password"
  //       }
  //     }

  //   }
  //   else {
  //     return {
  //       statusCode:401,
  //       status:false,
  //       message:"invalid user"
  //     }

  // }

 }
const withdraw=(acno, password, amt)=> {
   var amount = parseInt(amt)

  return db.User.findOne({acno,password})
  .then(user=>{
    if(user){
      if(user.balance>amount){

      
      user.balance = user.balance-amount
      user.transaction.push({
        type:'Debit',
        amount
      })
      user.save()
      // console.log(userDetails);
      return {
        statusCode:200,
        status:true,
        message:`${amount} is debited, balance is ${user.balance}`
      }     
     }
    
  
    else{
      return{
        statusCode:401,
        status:false,
        message:"insufficent balance"
      }
    }
          }
          else{
            return {
                      statusCode:401,
                      status:false,
                      message:"invalid password"
                    }
          }
          
          

  
        })
      }
   

//   var amount = parseInt(amt)
//   if (acno in userDetails) {
//     if (pswd == userDetails[acno]['password']) {
//       if (userDetails[acno]['balance'] > amount) {
//         userDetails[acno]['balance'] -= amount
//         userDetails[acno]['transaction'].push({
//           type:'Debit',
//           amount
//         })
//         console.log(userDetails);
//         return {
//           statusCode:200,
//           status:true,
//           message:`${amount} is debited, balance is ${userDetails[acno]['balance']}`
//         }     
//        }
    
//       else{
//         return{
//           statusCode:401,
//           status:false,
//           message:"insufficent balance"
//         }
//             }

//     }
//     else {
//       return {
//         statusCode:401,
//         status:false,
//         message:"invalid password"
//       }
//       }
     
// } 
//   else {
//     return {
//       statusCode:401,
//       status:false,
//       message:"invalid user"
//     }
//     }




const getTransaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){

    
    return {
      statusCode:200,
      status:true,
      transaction:user.transaction
    }
  }
  else{
    return {
      statusCode:400,
      status:false,
      message:"Transfer error"
    }
  }
  })
}

  // return {
  //   statusCode:200,
  //   status:true,
  //   transaction:userDetails[acno]['transaction']
  

//export
module.exports={
    register,login,deposit,withdraw,getTransaction
}