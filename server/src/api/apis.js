var express = require('express');
var jwt = require('jsonwebtoken');
var api_router = express.Router();
var userRouter = require('./routes/user');
var dataRouter = require('./routes/data');
var tokenRouter = require('./routes/token');
var authRouter = require('./routes/auth');
var {private_key} = require('./config');

function verifyToken(token){
  return jwt.verify(token, private_key)
}
// valid header authorization = Bearer+" "+token
api_router.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer'){
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try{
      var decode = verifyToken(req.headers.authorization.split(' ')[1]);
      // console.log('verify token success');
      next()
  }catch(err){
      const status = 401;
      const message = 'Error: access_token is not valid';
      res.status(status).json({status, message});
      return
  }
})

api_router.use('/user',userRouter);
api_router.use('/point',dataRouter);
api_router.use('/token',tokenRouter);
api_router.use('/auth',authRouter);

api_router.get('/', (req, res) => {
    res.send({
      message: 'Hello from the API version 1',
    });
  });
  

module.exports = api_router;