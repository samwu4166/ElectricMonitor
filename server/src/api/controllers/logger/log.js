var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');

export function logger(logList){
    var connection = new Connection(config);
    let sql_str = `insert into logger (method,url,status,response_time,request_datetime,ip) values ('${logList[0]}','${logList[1]}','${logList[2]}','${logList[3]}','${logList[4]}','${logList[5]}')`;
    var request = new Request(sql_str,function(err, rowCount){
        if (err) {
          console.log(err);
        } 
    })
    connection.on('error',function(err){
        if(err){
          console.log("connection failed ! message:"+err);
          //res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
        }
      })   
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
        }else{
            //console.log('connected to mssql .')
            connection.execSql(request);
        }
    });
}