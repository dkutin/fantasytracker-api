'use strict';

var Player = require('./player.model.js');

exports.list_all_players = function(req, res) {
    Player.getAllPlayers(function(err, players) {
        if (err)
            res.status(500).json(err);
        else
            res.json({
                status : 'Success', 
                response : players
            });
    });
};
exports.add_player = function(req, res) {
    var player = new Player(req.body);

    if (!player.full_name || !player.image || !player.number || !player.playerId || !player.position || !player.team){
        res.status(400).json({
            error: true,
            message: 'Please provide valid player fields'
        });
    } else {
        Player.add(player, function(err, players) {
            if (err)
                res.json(err);
            else
                res.status(201).json({
                    status : 'Successfully added', 
                    response : players
                });
        });
    }
};
exports.get_player_by_id = function(req, res) {
    Player.getPlayerById(req.params.playerId, function(err, player) {
        if (err)
            res.json(err);
        else
            res.json({
                status : 'Success', 
                response : player
            });
    });
};
exports.update_player = function(req, res) {
    Player.updateById(req.params.playerId, new Player(req.body), function(err, player) {
        if (err)
            res.json(err);
        else
            res.status(201).json({
                status : 'Successfully Updated', 
                info : player
            });
    });
};
exports.delete_player = function(req, res) {
    Player.remove(req.params.playerId, function(err, player) {
        if (err)
            res.json(err);
        else
            res.status(201).json({ 
                message : 'Player successfully deleted',
                info : player
            });
    });
};