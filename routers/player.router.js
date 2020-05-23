'use strict';
module.exports = function(app) {
    var player = require('../controllers/player.controller');

    // todoList Routes
    app.route('/api/v1/players')
        .get(player.list_all_players)
        .post(player.add_player);

    app.route('/api/v1/players/:playerId')
        .get(player.get_player_by_id)
        .put(player.update_player)
        .delete(player.delete_player);
};