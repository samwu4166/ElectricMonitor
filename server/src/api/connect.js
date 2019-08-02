let Mysqli = require('mysqli')

//传入json
let conn = new Mysqli({
  host: 'localhost', // IP/域名
  post: 3306, //端口， 默认 3306
  user: 'app', //用户名
  passwd: '1qaz2wsx', //密码
  charset: '', // 数据库编码，默认 utf8 【可选】
  db: '' // 可指定数据库，也可以不指定 【可选】
})

let conn2 = new Mysqli({
  host: 'localhost', // IP/域名
  post: 3306, //端口， 默认 3306
  user: 'root', //用户名
  passwd: 'j6t/6bj6', //密码
  charset: '', // 数据库编码，默认 utf8 【可选】
  db: '' // 可指定数据库，也可以不指定 【可选】
})

module.exports = conn2;