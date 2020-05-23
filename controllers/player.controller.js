'use strict';

var Player = require('../models/player.model.js');

exports.list_all_players = function(req, res) {
    Player.getAllPlayers(function(err, task) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', task);
        res.send(task);
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
        Player.add(player, function(err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    }
};


exports.get_player_by_id = function(req, res) {
    Player.getPlayerById(req.params.playerId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_player = function(req, res) {
    Player.updateById(req.params.playerId, new Player(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_player = function(req, res) {
    Player.remove( req.params.playerId, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Player successfully deleted' });
    });
};
