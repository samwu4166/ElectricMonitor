var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const saltRounds = 10;

export function postUser(req,res){
    let token = req.body.token;
    let account = req.body.account;
    let password = req.body.password;
    let tokencontinue = 1;
    let accountcontinue = 1;
    //console.log(`get a token use req for ${token}`)
   
    var connection = new Connection(config);
    var checktoken = new Request(`select * from authtoken where token='${token}' `,function(err, rowCount){
        //console.log("token start")
        //console.log(`match ${rowCount} data from sql`);
        if (err) {
          tokencontinue=0;
          console.log(err);
          res.status(400).json({status:"bad request",data:{message:err}});
        }
        else if(!rowCount){
          tokencontinue=0;
          //console.log("error checktoken")
          res.status(400).json({status:"bad request",data:{message:'you can not use this token to build account'}});
       }
    })
  
    checktoken.on('requestCompleted',function(){
      //console.log("complete token")
      if(!tokencontinue){
         return;
      }
      var checkaccount = new Request(`select * from user_info where account='${account}'`,function(err,rowCount){
        //console.log("checkaccount start");
        if(err){
          accountcontinue = 0;
          console.log(err);
          res.status(400).json({status:"bad request",data:{message:err}});
        }
        else if(rowCount){
          accountcontinue = 0;
          //console.log("error checkacount")
          res.status(400).json({status:"bad request",data:{message:'duplicate account !'}});
        }
      })
      checkaccount.on('requestCompleted',async function(){
        if(!accountcontinue){
           return ;
        }
        //console.log("check account complete");
        let crypt_word = bcrypt.hashSync(password, saltRounds);
        //res.status(200).json({status:"OK",data:{message:'you can use this account to create account!'}});
          var createaccount = new Request(`insert into user_info (uuid,account,password,token) values 
          ('${uuidv1()}','${account}','${crypt_word}','${token}')`,function(err,rowCount){
              //console.log("create account start");
              if(err){
                  console.log(err);
                  res.status(400).json({status:"bad request",data:{message:err}});
              }
          })
          createaccount.on('requestCompleted',function(){
              //console.log("create account finish");
              connection.execSql(
                new Request(`Update authtoken set us_use=1 where token='${token}' `,
                  function(err){
                    if(err){
                      console.log(err);
                      res.status(400).json({status:"bad request",data:{message:err}});
                    }else{
                      res.status(200).json({status:"OK",data:{message:"create user successfully"}});
                    }
                  })
              );
          })
          connection.execSql(createaccount);
      })
      connection.execSql(checkaccount);
    })
    connection.on('error',function(err){
      if(err){
        console.log("connection failed ! msg:"+err);
        //res.status(503).json({status:'Service unavailable',data:{msg:err,error_code:5}});
next()
      }
    })
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
            res.status(503).json({status:'Service unavailable',data:{msg:err,error_code:5}});
        }else{
            // console.log("connect to sql !");
            connection.execSql(checktoken);
        }
    });
}