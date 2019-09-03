var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRouter = require('./api/apis');

var app = express();
var port = 8080;
//remove limit of listener handler
require('events').EventEmitter.defaultMaxListeners = 0;
//swap jade for ejs etc
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  console.log("get request : "+req.ip);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});
// enable proxy to get remote client ip
app.enable('trust proxy',true);
// visit spa
app.use('/api/v1', apiRouter);
app.get('*',function(req,res){
   res.sendStatus(404);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(port, function () {
  console.log(`running api server on port ${port}!`);
});

module.exports = app;
