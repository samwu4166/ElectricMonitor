var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../../config');
import {rowSql2Json} from '../../includes/rowsql2json';

function getUserList(req,res) {
  var connection = new Connection(config);
  var data_arr = []
  var getUser = new Request(`select * from user_info`,function(err){
    if(err){
      //console.log(err);
      res.status(400).json({status:"bad request",data:{msg:err}});
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

  connection.on('connect',function(err){
    if(err){
     //console.log(err);
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
          res.status(400).json({status:"bad request",data:{msg:err}});
      }
      else if(!rowCount){
          console.log("no matched");
          res.status(400).json({status:"bad request",data:{msg:"no matched"}});
      }
      else{
          let json_data = rowSql2Json(rows[0]);
          res.status(200).json({status:"OK",data:{msg:json_data}});
      }
  })
  connection.on('connect',function(err){
      if(err){
          console.log(err);
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