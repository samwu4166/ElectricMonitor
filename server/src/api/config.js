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
        port : 1401,
        database: 'testDB',
        rowCollectionOnRequestCompletion: true,
    }
  }
var private_key = 'BD78B9F28AF21922BECAC57EBCC3F';

module.exports = {
    config,
    private_key,
};