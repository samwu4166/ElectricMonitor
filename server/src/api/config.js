// Create connection to database
var config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'SA', // update me
            password: 'Samj6t/6bj6' // update me
        }
    },
    options: {
        port : 1401,  //because it is docker config
        database: 'testDB',
        rowCollectionOnRequestCompletion: true,
    }
  }
// var config = {
//     server: '192.168.50.45',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'app', // update me
//             password: '1qaz2wsx' // update me
//         }
//     },
//     options: {
//         port : 1433, // real port on formal env
//         database: 'app_project',
//         rowCollectionOnRequestCompletion: true,
//     }  
// }
var private_key = 'BD78B9F28AF21922BECAC57EBCC3F';
var token_expire = 60*5;// test: 60mins ,formal : 5 mins

module.exports = {
    config,
    private_key,
    token_expire,
};