var express = require('express');
var router = express.Router();
var conn = require('../connect');
var moment = require('moment');
/* GET home page. */
router.get('/', function(req, res, next) {
  let point_nums = 9;
  let db = conn.emit(false, 'clientdb');
  db
   .query(`select t.* from (select * from point_info ORDER BY point_info.datetime DESC limit ${[point_nums]})t order by t.tagname`)
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

module.exports = router;
