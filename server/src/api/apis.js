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
  // console.log(req.headers);
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer'){
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try{
      var decode = verifyToken(req.headers.authorization.split(' ')[1]);
      const url = req.originalUrl;
      let { _auth } = decode.payload;
      console.log(decode);
      if (!url.match(/point/g) && _auth!=0 ) {   // if url dont match point but permission is not admin
          // console.log("return back permission")
          res.status(400).json({status:"bad request",data:{message:'this account has no permission to do this'}})
          return
      }
      else {
          res.locals.decode = decode;
          // console.log("next")
          next()
      }
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

api_router.post('/logout', (req, res) => {
    res.status(200).json({
      message: 'you are logout !',
    });
  });
  api_router.get('/', (req, res) => {
    res.send({
      message: 'Hello from the API version 1',
    });
  });

module.exports = api_router;