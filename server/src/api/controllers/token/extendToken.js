import {private_key} from '../../config.js';
var jwt = require('jsonwebtoken');

export function extendToken(req,res,next){
    const decode = res.locals.decode;
    // console.log(decode);
    const payload = decode.payload;
    // console.log(payload);
    const token = jwt.sign({ payload }, private_key, { expiresIn: '7d' });
    res.status(200).json({status:"OK",data:{message:'extends success!',permission:payload['_auth'],token:token}});
}