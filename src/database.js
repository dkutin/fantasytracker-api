'user strict';

var mysql = require('mysql');
var dotenv = require('dotenv')

dotenv.config();

//local mysql db connection
var connection = mysql.createConnection({
    socketPath: `/cloudsql/${process.env.APP_DB_HOST}`, // The fix
    user     : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;