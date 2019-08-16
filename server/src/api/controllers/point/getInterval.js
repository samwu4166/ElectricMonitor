import {Connection,Request} from 'tedious';
var { config } = require('../../config');

export function getInterval(req,res){
    let tag_name = req.params.tagname;
    if(tag_name==undefined){
        res.status(400).json({status:'Bad Request',msg:'no assign variable'})
        return
    }
    var connection = new Connection(config);
    let sql_str = `select top 1000 * from point_info where tagname = 'A${tag_name}' ORDER BY datetime DESC `;
    let data_arr = [];
    var request = new Request(sql_str,function(err, rowCount){
        if (err) {
          console.log(err);
          res.status(400).json({status:'Bad Request',msg:'error with query'})
          return
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
            connection.execSql(request);
        }
    });
}