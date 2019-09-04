var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var { config } = require('../../config');
const uuidv1 = require('uuid/v1');

export function postToken(req,res){
    let auth = req.body.id;
    let uuid = uuidv1();
    var connection = new Connection(config);
    let sql_str = `insert into authtoken (auth,token,us_use) values ('${auth}','${uuid}','0')`;
  
    var request = new Request(sql_str,function(err, rowCount){
        if (err) {
          console.log(err);
          res.status(400).json({status:"bad request",data:{message:err,error_code:51}})
        } 
    })
    request.on('doneInProc', function (rowCount, more, rows) {  
      //console.log('doneInProc: '+ rowCount + ' row(s) returned');
      res.status(200).json({status:'OK',data:{valid_token:uuid,auth:auth}});
    });
    connection.on('error',function(err){
        if(err){
          console.log("connection failed ! message:"+err);
          //res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
        }
      })   
    connection.on('connect', function(err) {
        if(err){
            console.log(err)
            res.status(503).json({status:'Service unavailable',data:{message:err,error_code:5}});
        }else{
            //console.log('connected to mssql .')
            connection.execSql(request);
        }
    });
}