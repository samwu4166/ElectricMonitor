import {Connection,Request} from 'tedious';
var { config } = require('../../config');

export function getRealtime(req,res){
    let point_nums = 9;
    let site_num = 1;
    var connection = new Connection(config);
    let sql_str = `select t.* from (select TOP ${point_nums} * from point_info where site = 'N${site_num}' ORDER BY point_info.datetime DESC)t order by t.tagname`;
    let data_arr = [];
    var request = new Request(sql_str,function(err, rowCount){
        if (err) {
          console.log(err);
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
      res.status(200).json({status:"OK",msg:{tagname:'All',data:data_arr}});
    });
    connection.on('error',function(err){
      if(err){
        console.log("connection failed ! msg:"+err);
        res.status(503).json({status:'Service unavailable',data:{msg:err,error_code:5}})
      }
    })   
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
        }else{
            connection.execSql(request);
        }
    });
}