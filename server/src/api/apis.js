var express = require('express');

var api_router = express.Router();
var userRouter = require('./routes/user');
var dataRouter = require('./routes/data');
var tokenRouter = require('./routes/token');
var authRouter = require('./routes/login');

api_router.use('/user',userRouter);
api_router.use('/point',dataRouter);
api_router.use('/token',tokenRouter);
api_router.use('/login',authRouter);

api_router.get('/', (req, res) => {
    res.send({
      message: 'Hello from the API version 1',
    });
  });
  

module.exports = api_router;