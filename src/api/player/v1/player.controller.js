'use strict';

var Player = require('./player.model.js');

exports.list_all_players = function(req, res) {
    Player.getAllPlayers(function(err, players) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', players);
        res.send(players);
    });
};


exports.add_player = function(req, res) {
    var player = new Player(req.body);

    //handles null error
    if(!player.full_name || !player.image || !player.number || !player.playerId || !player.position || !player.team){
        res.status(400).send({ error:true, message: 'Please provide valid player fields' });
    }
    else{
        // Use create instead of update
        Player.add(player, function(err, player) {
            if (err)
                res.send(err);
            res.json(player);
        });
    }
};


exports.get_player_by_id = function(req, res) {
    Player.getPlayerById(req.params.playerId, function(err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};


exports.update_player = function(req, res) {
    Player.updateById(req.params.playerId, new Player(req.body), function(err, player) {
        if (err)
            res.send(err);
        res.json(player);
    });
};


exports.delete_player = function(req, res) {
    Player.remove( req.params.playerId, function(err, player) {
        if (err)
            res.send(err);
        res.json({ message: 'Player successfully deleted' });
    });
};
