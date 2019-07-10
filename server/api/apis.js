var express = require('express');

var api_router = express.Router();
var userRouter = require('./member/user');

api_router.use('/member',userRouter);
//api_router.use('/login');

module.exports = api_router;