var express = require('express');

var api_router = express.Router();
var userRouter = require('./member/user');
var dataRouter = require('./point/data');

api_router.use('/member',userRouter);
api_router.use('/point',dataRouter);
//api_router.use('/login');

module.exports = api_router;