var express = require('express');
var router = express.Router();
var conn = require('../connect');
var moment = require('moment');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('./config');

/* GET data from mysql */
router.get('/mysql', function(req, res, next) {
  let point_nums = 9;
  let db = conn.emit(false, 'clientdb');
  db
   .query(`select t.* from (select * from point_info ORDER BY point_info.datetime DESC limit ${point_nums})t order by t.tagname`)
   .then(data => {
    data.map(function(row){
       let new_date = moment(row['datetime']).format('YYYY-MM-DDTHH:mm:ss');
       row['datetime'] = new_date;
    })
    res.send(data);
   })
   .catch(err => {
     console.log(err);
   })
});
/* Get data from mssql*/
router.get('/mssql', function(req, res, next) {
  let point_nums = 9;
  var connection = new Connection(config);
  let sql_str = `select t.* from (select TOP ${point_nums} * from point_info ORDER BY point_info.datetime DESC)t order by t.tagname`;
  let data_arr = [];
  request = new Request(sql_str,function(err, rowCount){
      if (err) {
        console.log(err);
      } 
  })

  request.on('row', function(columns) {
    let tjson = {};
    columns.forEach(function(column) {
      tjson[column['metadata']['colName']] = column['value'];
    });
    tjson['datetime'] = moment(tjson['datetime']).format('YYYY-MM-DDTHH:mm:ss');
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
          //console.log('connected to mssql .')
          connection.execSql(request);
      }
  });
});
module.exports = router;
