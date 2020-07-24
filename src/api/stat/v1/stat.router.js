'use strict';
module.exports = function(app) {
    var stat = require('./stat.controller');

    app.route('/api/v1/stats/:playerId')
        .get(stat.get_player_stats)
        .post(stat.add_player_stats)
        .delete(stat.remove_by_player_id);
    app.route('/api/v1/stats/:playerId/:week')
        .get(stat.get_player_stats_by_week)
        .post(stat.update_by_week_id)
        .delete(stat.remove_by_week_id);
};