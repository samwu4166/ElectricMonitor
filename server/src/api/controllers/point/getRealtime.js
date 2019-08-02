import {Connection,Request} from 'tedious';
var config = require('../../config');

export function getRealtimeMssql(req,res){
    let point_nums = 9;
    var connection = new Connection(config);
    let sql_str = `select t.* from (select TOP ${point_nums} * from point_info ORDER BY point_info.datetime DESC)t order by t.tagname`;
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
      res.send(data_arr);
    });   
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
        }else{
            console.log('connected to mssql .')
            connection.execSql(request);
        }
    });
}