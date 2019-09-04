import {private_key,token_expire} from '../../config.js';
var jwt = require('jsonwebtoken');

export function extendToken(req,res,next){
    var redis = require("redis");
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
        return;
    });
    const decode = res.locals.decode;
    // console.log(decode);
    const payload = decode.payload;
    //console.log(payload);
    // payload = { _account , _auth }
    const token = jwt.sign({ payload }, private_key, { expiresIn: token_expire });
    var timeoutId = setTimeout(()=>{
        res.status(503).json({status:'Service unavailable',data:{msg:"redis server error",error_code:6}}).end();
        client.end(true);
    },5000);
    client.set(payload['_account'],token,'EX',`${token_expire}`,function(err,reply){
        clearTimeout(timeoutId);
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json({status:"OK",data:{message:'extends success!',permission:payload['_auth'],token:token}});
        }
    }); 
}