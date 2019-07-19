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
        database: 'testDB'
    }
  }

module.exports = config;