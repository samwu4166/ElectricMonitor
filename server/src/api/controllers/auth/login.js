var jwt = require('jsonwebtoken');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var bcrypt = require('bcrypt');
var {config,private_key,token_expire} = require('../../config');
import {rowSql2Json} from '../../includes/rowsql2json';
var redis = require("redis");
var client = redis.createClient();
export function authenticate(req,res){
    client.on("error", function (err) {
        console.log("Error " + err);
        res.status(400).json({status:"bad request",data:{message:err}});
        return;
    });
    console.log(req.ip);
    let account = req.body.account;
    let password = req.body.password;
    let body = req.body;
    var connection = new Connection(config);
    let isverify = 1;
    var authaccount = new Request(`select uuid,account,password,auth,status from user_info,authtoken where user_info.token=authtoken.token and account = '${account}'`,function(err,rowCount,rows){
        if(err){
            console.log(err);
            res.status(400).json({status:"bad request",data:{message:err}});
            isverify = 0;
        }
        else if(!rowCount){
            res.status(400).json({status:"bad request",data:{message:"no matched account"}});
            isverify = 0;
        }
        else{
            let json_data = rowSql2Json(rows[0]);
            //console.log(json_data);
            if(bcrypt.compareSync(password, json_data['password'])){
                if(json_data['status']===0){
                    res.status(403).json({status:"Forbidden",data:{message:'Login failed! Account has been suspended',error_code:4}});
                    return;
                }
                const payload = {
                    _account : json_data['account'],
                    _auth : json_data['auth'],
                };
                // console.log(json_data);
                const token = jwt.sign({ payload }, private_key, { expiresIn: token_expire });
                client.set(json_data['account'],token,'EX',`${token_expire}`);
                res.status(200).json({status:"OK",data:{message:'Login success!',permission:json_data['auth'],token:token}});
                isverify = 1;
            }
            else{
                res.status(403).json({status:"Forbidden",data:{message:'Login failed! password wrong'}});
                isverify = 0;
            }
        }
    })
    connection.on('connect',function(err){
        if(err){
            console.log(err);
            return;
        }else{
            connection.execSql(authaccount);
        }
    })
}