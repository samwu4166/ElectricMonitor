var redis = require("redis");
var client = redis.createClient();

export function logout(req,res,next){
    const decode = res.locals.decode;
    // console.log(decode);
    const payload = decode.payload;
    //console.log(payload);
    // payload = { _account , _auth }
    client.get(payload['_account'], function(err,reply){
        //console.log(reply);
        if(reply===null){
            //console.log("null account to be deleted");
            res.status(400).json({status:"bad request",data:{message:"this account is unavailable"}});
            return;
        }
        else{
            client.del(payload['_account'], function(err,reply){
                if(err){
                    console.log("Error " + err);
                    res.status(400).json({status:"bad request",data:{message:err}});
                    
                    return;
                }
                else{
                    res.status(200).json({status:"logout",data:{message:+" has been logout"}});
                    
                }
                client.quit();
            });
        }
    })  
}