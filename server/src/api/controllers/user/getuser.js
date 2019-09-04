var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');
import {rowSql2Json} from '../../includes/rowsql2json';

function getUserList(req,res) {
  var connection = new Connection(config);
  var payload = res.locals.decode.payload;
  var auth = payload['_auth'];
  //console.log(auth);
  var data_arr = []
  var getUser = new Request(`select account,user_info.token,status,auth from user_info,authtoken where user_info.token = authtoken.token and auth >= ${auth}`,function(err){
    if(err){
      //console.log(err);
      res.status(400).json({status:"bad request",data:{message:err,error_code:51}});
    }
  })

  getUser.on('row', function(columns) {
    let tjson = {};
    columns.forEach(function(column) {
      tjson[column['metadata']['colName']] = column['value'];
    });
    data_arr.push(tjson);
  });
  getUser.on('doneInProc', function (rowCount, more, rows) {  
    ////console.log('doneInProc: '+ rowCount + ' row(s) returned');
    res.send(data_arr);
  });   
  connection.on('error',function(err){
    if(err){
      console.log("connection failed ! message:"+err);
      //res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
    }
  })
  connection.on('connect',function(err){
    if(err){
      res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
    }
    else{
     connection.execSql(getUser);
    }
 })
}
function getUser(req,res){
  let account = req.params.account;
  var connection = new Connection(config);
  console.log(account);
  let isverify = 1;
  var authaccount = new Request(`select * from user_info where account = '${account}'`,function(err,rowCount,rows){
      if(err){
          console.log(err);
          res.status(400).json({status:"bad request",data:{message:err}});
      }
      else if(!rowCount){
          console.log("no matched");
          res.status(400).json({status:"bad request",data:{message:"no matched"}});
      }
      else{
          let json_data = rowSql2Json(rows[0]);
          res.status(200).json({status:"OK",data:{message:json_data}});
      }
  })
  connection.on('error',function(err){
    if(err){
      console.log("connection failed ! message:"+err);
      //res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
    }
  })
  connection.on('connect',function(err){
      if(err){
          console.log(err);
          res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
      }else{
          console.log("connected");
          connection.execSql(authaccount);
      }
  })
}
module.exports={ 
  getUserList,
  getUser
}