var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('../../config');

export function getUser(req,res) {
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