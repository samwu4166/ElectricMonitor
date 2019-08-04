var jwt = require('jsonwebtoken');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var bcrypt = require('bcrypt');
var {config,private_key} = require('../../config');
import {rowSql2Json} from '../../includes/rowsql2json';

export function authenticate(req,res){
    let account = req.body.account;
    let password = req.body.password;
    let body = req.body;
    var connection = new Connection(config);
    let isverify = 1;
    var authaccount = new Request(`select uuid,account,password,auth from user_info,authtoken where user_info.token=authtoken.token and account = '${account}'`,function(err,rowCount,rows){
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
            if(bcrypt.compareSync(password, json_data['password'])){
                const payload = json_data;
                // console.log(json_data);
                const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, private_key);
                res.status(200).json({status:"OK",data:{message:'Login success!',permission:json_data['auth'],token:token}});
                isverify = 1;
            }
            else{
                res.status(400).json({status:"Bad Request",data:{message:'Login failed! password wrong'}});
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