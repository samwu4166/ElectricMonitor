import {Connection,Request} from 'tedious';
var { config } = require('../../config');

export function getInterval(req,res){
    let tag_name = req.params.tagname;
    if(tag_name==undefined){
        console.log("client not assign value");
        res.status(400).json({status:'Bad Request',msg:'no assign variable'})
        return
    }
    var connection = new Connection(config);
    // need bonus price to upgrade the maximun points to show
    let sql_str = `select top 360 * from point_info where tagname = 'A${tag_name}' ORDER BY datetime ASC `;
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
      res.status(200).json({status:"OK",msg:{tagname:tag_name,data:data_arr}});
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