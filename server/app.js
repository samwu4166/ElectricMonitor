var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./api/apis');

var app = express();
var port = 8080;
// view engine setup

//swap jade for ejs etc
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// visit static resource
//app.use(express.static(path.resolve(__dirname, '../dist')));
// visit spa
app.use('/api', apiRouter);
app.get('*', function (req, res) {
//   var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
     var html = fs.readFileSync(path.resolve(__dirname, '../client/public/index.html'), 'utf-8');
     res.send(html);
 });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
