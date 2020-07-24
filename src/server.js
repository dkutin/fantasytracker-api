const express = require('express'),
app = express(),
bodyParser = require('body-parser');
port = process.env.PORT || 3000;


const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'fantasytracker_db'
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Declare Path of Routers
var player_routes = require('./api/player/v1/player.router');
var player_stat_routes = require('./api/stat/v1/stat.router');

// Register the routes
player_routes(app); 
player_stat_routes(app);