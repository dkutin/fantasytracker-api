const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    http = require('http'),
    player_routes = require('./api/player/v1/player.router'),
    player_stat_routes = require('./api/stat/v1/stat.router'),
    port = process.env.PORT || 3000;

const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;
const spec = path.join(__dirname, 'openapi.yaml');

app.use('/spec', express.static(spec));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

new OpenApiValidator({
    apiSpec: 'openapi.yaml',
    // validateResponses: true,
    validateRequests: true
  }).install(app)
    .then(() => {
        player_routes(app); 
        player_stat_routes(app);
        app.use((err, req, res, next) => {
            // 7. Customize errors
            console.error(err); // dump error to console for debug
            res.status(err.status || 500).json({
              message: err.message,
              errors: err.errors,
            });
          });
        http.createServer(app).listen(3000);
    })