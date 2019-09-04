

export function logout(req,res,next){
    const decode = res.locals.decode;
    // console.log(decode);
    const payload = decode.payload;
    //console.log(payload);
    // payload = { _account , _auth }
    var redis = require("redis");
    var client = redis.createClient();
    client.on('error',function(err){
        console.log("redis error occured : "+err);
        return;
    })
    client.get(payload['_account'], function(err,reply){
        if(reply===null){
            //console.log("null account to be deleted");
            res.status(400).json({status:"bad request",data:{message:"null key in redis",error_code:6}});
            return;
        }
        else{
            client.del(payload['_account'], function(err,reply){
                if(err){
                    console.log("Error " + err);
                    res.status(400).json({status:"bad request",data:{message:err,error_code:6}});
                    return;
                }
                else{
                    res.status(200).json({status:"logout",data:{message:payload['_account']+" has been logout"}});   
                }
            });
        }
    })  
}