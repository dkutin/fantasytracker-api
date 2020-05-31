'use strict';
module.exports = function(app) {
    var stat = require('./stat.controller');

    // Player Routes
    app.route('/api/v1/stats/:playerId')
        .get(stat.get_player_stats);
    app.route('/api/v1/stats/:playerId/:week')
        .get(stat.get_player_stats_by_week);
};