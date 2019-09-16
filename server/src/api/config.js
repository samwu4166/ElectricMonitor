require('dotenv').config();
// Create connection to database
var config = {
    server: process.env.DB_HOST,
    authentication: {
        type: process.env.DB_AUTH_TYPE,
        options: {
            userName: process.env.DB_USER, // update me
            password: process.env.DB_PASS // update me
        }
    },
    options: {
        port : parseInt(process.env.DB_PORT),  //because it is docker config
        database: process.env.DB_DATABASE,
        rowCollectionOnRequestCompletion: true,
    }
  }
var private_key = process.env.PRIVATE_KEY;
var token_expire = parseInt(process.env.TOKEN_EXP);// test: 60mins ,formal : 5 mins

module.exports = {
    config,
    private_key,
    token_expire,
};