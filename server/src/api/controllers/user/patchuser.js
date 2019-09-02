var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');

function patchUser(req,res){
  let account = req.params.account;
  let object = req.body;
  var connection = new Connection(config);
  //console.log(object);
  let keyList = Object.keys(object);
  keyList.forEach(key => {
    var patchUser = new Request(`Update user_info set ${key} = ${object[key]} where account = '${account}'`,function(err,rowCount,rows){
        if(err){
            console.log(err);
            res.status(400).json({status:"bad request",data:{message:err}});
        }
        else{
            res.status(200).json({status:"OK",data:{message:"PATCH OK"}});
        }
    })
    connection.on('connect',function(err){
        if(err){
            console.log(err);
        }else{
            connection.execSql(patchUser);
        }
    })
  })
}
module.exports={ 
  patchUser
}