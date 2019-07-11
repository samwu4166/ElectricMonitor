var express = require('express');
var router = express.Router();
var conn = require('../connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  let point_nums = 9;
  let db = conn.emit(false, 'clientdb');
  db
   .query(`select * from point_info ORDER BY point_info.datetime DESC limit ${[point_nums]}`)
   .then(data => {
    res.send(data);
   })
   .catch(err => {
     console.log(err);
   })
});

module.exports = router;
