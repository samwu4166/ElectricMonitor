var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');

export function getToken(req,res){
    var connection = new Connection(config);
    let sql_str = `select * from authtoken`;
    var data_arr = [];
    var request = new Request(sql_str,function(err, rowCount){
        if (err) {
          console.log(err);
          res.status(400).json({status:"bad request",data:{message:err,error_code:51}})
        } 
    })
    request.on('row', function(columns) {
        let tjson = {};
        columns.forEach(function(column) {
          tjson[column['metadata']['colName']] = column['value'];
        });
        data_arr.push(tjson);
    });
    request.on('doneInProc', function (rowCount, more, rows) {  
      //console.log('doneInProc: '+ rowCount + ' row(s) returned');
      res.status(200).json({status:'OK',data:{valid_token:data_arr}});
    });
    connection.on('error',function(err){
      if(err){
        console.log("connection failed ! message:"+err);
        //res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
next()
      }
    }) 
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
            res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
        }else{
            //console.log('connected to mssql .')
            connection.execSql(request);
        }
    });
}