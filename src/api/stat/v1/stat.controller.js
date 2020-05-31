'use strict';

var Stat = require('./stat.model.js');

exports.get_player_stats = function(req, res) {
    Stat.getStatById(req.params.playerId, function(err, stats) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', stats);
        res.send(stats);
    });
};
exports.get_player_stats_by_week = function(req, res) {
    Stat.getPlayerByIdWeek(req.params.playerId, req.params.week, function(err, stats) {
        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', stats);
        res.send(stats);
    });
};
// TODO: Add remaining hooks from controller.