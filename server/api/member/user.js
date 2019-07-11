var express = require('express');
var router = express.Router();
var conn = require('../connect');
/* GET home page. */
router.get('/', function(req, res, next) {
  let db = conn.emit(false, 'clientdb');
  db
   .tableList()
   .then(data => {
    res.send(data);
   })
   .catch(err => {
     console.log(err);
   })
});

module.exports = router;
