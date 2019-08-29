import {private_key} from '../../config.js';
var jwt = require('jsonwebtoken');
var redis = require("redis");
var client = redis.createClient();
export function extendToken(req,res,next){
    client.on("error", function (err) {
        console.log("Error " + err);
        res.status(400).json({status:"bad request",data:{message:err}});
        return;
    });
    const decode = res.locals.decode;
    // console.log(decode);
    const payload = decode.payload;
    //console.log(payload);
    // payload = { _account , _auth }
    const token = jwt.sign({ payload }, private_key, { expiresIn: '0.5h' });
    client.set(payload['_account'],token,'EX','1800');
    res.status(200).json({status:"OK",data:{message:'extends success!',permission:payload['_auth'],token:token}});
    client.quit();
}