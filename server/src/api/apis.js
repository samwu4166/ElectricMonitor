var express = require('express');
var jwt = require('jsonwebtoken');
var api_router = express.Router();
var userRouter = require('./routes/user');
var dataRouter = require('./routes/data');
var tokenRouter = require('./routes/token');
var authRouter = require('./routes/auth');
var {private_key,config} = require('./config');
var {logout} = require('./controllers/auth/logout')
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
import {rowSql2Json} from './includes/rowsql2json';

function verifyToken(token){
  return jwt.verify(token, private_key)
}
// valid header authorization = Bearer+" "+token
api_router.use(/^(?!\/auth).*$/, (req, res, next) => {
  //console.log(req.ip);
  var redis = require("redis");
  var client = redis.createClient();
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer'){
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message ,error_code:0})
    return
  }
  try{
      var decode = verifyToken(req.headers.authorization.split(' ')[1]);
      const url = req.originalUrl;
      let { _auth } = decode.payload;
      //console.log(decode);
      let account = decode.payload['_account'];
      var connection = new Connection(config);
      var accountState = 0;
      connection.on('error',function(err){
        if(err){
          console.log("connection failed ! msg:"+err);
          //res.status(503).json({status:'Service unavailable',data:{msg:err,error_code:5}});
        
        }
      })
      connection.on('connect',function(err){
        if(err){
            console.log("account verify error : "+err);
            res.status(503).json({status:'Service unavailable',data:{msg:err,error_code:5}});
        }else{
            //console.log("connected");
            let accountStatus = new Request(`select * from user_info where account='${account}'`,(err,rowCount,rows)=>{
                let json_data = rowSql2Json(rows[0]);
                accountState = json_data['status'];
                if(accountState!==1){
                  console.log("suspened error return");
                  res.status(401).json({status:"UnAuthorized", data:{message:"this account has been suspended" ,error_code:4}})
                  return;
                }
                else{
                  client.get(account,function(err,reply){
                    if(reply !== req.headers.authorization.split(' ')[1]){
                        console.log(`single login error return \n repli:${reply}  \n req:${req.headers.authorization.split(' ')[1]}`)
                        res.status(400).json({status:"bad request",data:{message:'this account has been login with other devices',error_code:1}})
                        return
                    }
                    else{
                      // auth : 0->root , 1->systemAdmin , 2->client
                      //console.log(_auth);
                      if (!url.match(/point/g) && _auth!=0 && _auth!=1) {   // if url dont match point but permission is not admin
                        console.log("back permission return")
                        res.status(400).json({status:"bad request",data:{message:'this account has no permission to do this(point)',error_code:2}})
                        return
                      }
                      else if(url.match(/token/g) && _auth!=0){
                        console.log("back permission return")
                        res.status(400).json({status:"bad request",data:{message:'this account has no permission to do this(token)',error_code:2}})
                        return
                      }
                      else {
                          res.locals.decode = decode;
                          // console.log("next")
                          next()
                      }
                    }
                });
                }
            })
            connection.execSql(accountStatus);
        }
      })
  }catch(err){
      const status = 401;
      const message = `Error: access_token is not valid (${err})`;
      console.log("back token error return")
      res.status(status).json({status, message,error_code:3});
      return
  }
})

api_router.use('/user',userRouter);
api_router.use('/point',dataRouter);
api_router.use('/token',tokenRouter);
api_router.use('/auth',authRouter);

api_router.post('/logout', logout);

module.exports = api_router;