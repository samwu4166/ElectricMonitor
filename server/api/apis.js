var express = require('express');

var api_router = express.Router();
var userRouter = require('./member/user');
var dataRouter = require('./point/data');
var tokenRouter = require('./token/token');

api_router.use('/user',userRouter);
api_router.use('/point',dataRouter);
api_router.use('/token',tokenRouter);
//api_router.use('/login');

module.exports = api_router;