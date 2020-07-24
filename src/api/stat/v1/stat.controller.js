'use strict';

var Stat = require('./stat.model.js');

exports.get_player_stats = function(req, res) {
    Stat.getStatById(req.params.playerId, 
        function(err, stats) {
            if (err)
                res.json(err);
            else if (Object.keys(stats).length === 0)
                res.json({
                    status : 'No Results Found'
                });
            else
                res.json({
                    status : 'Success', 
                    response : stats
                });
        }
    );
};
exports.get_player_stats_by_week = function(req, res) {
    Stat.getPlayerByIdWeek(req.params.playerId, req.params.week, 
        function(err, stats) {
            if (err)
                res.json(err);
            else if (Object.keys(stats).length === 0)
                res.json({
                    status : 'No Results Found'
                });
            else
                res.json({
                    status : 'Success', 
                    response : stats
                });
        }
    );
};
exports.update_by_week_id = function(req, res) {
    Stat.updateByIdWeek(req.body.playerId, req.body.week, new Stat(req.query), 
        function(err, stats) {
            if (err)
                res.json(err);
            else
                res.status(201).json({
                    status : 'Successfully Updated', 
                    info : stats
                });
        }
    );
};
exports.add_player_stats = function(req, res) {
    if (!req.body.week || !req.body.gp || !req.body.pts || !req.body.ast || 
        !req.body.reb || !req.body.stl || !req.body.blk || !req.body.trn) {
        res.status(400).json({ 
            error : true,
            message : 'Invalid body parameters'
        });
    }
    else if (req.params.playerId.toString().length != 4) {
        res.status(400).json({ 
            error : true,
            message : 'Invalid parameter (playerId) Length'
        });
    } else {
        Stat.add(req.params.playerId, new Stat(req.body),
        function(err, stats) {
            if (err)
                res.json(err);
            else
                res.status(201).json({
                    status : 'Successfully Created', 
                    info : stats
                });
        });
    } 
};
exports.remove_by_player_id = function(req, res) {
    Stat.removeByPlayerId(req.params.playerId,
        function(err, stats) {
            if (err)
                res.json(err);
            else 
                res.json({
                    status : 'Successfully Removed', 
                    info : stats
                }
            );
        }
    );
};
exports.remove_by_week_id = function(req, res) {
    if (!req.params.playerId || !req.params.week) {
        res.status(400).json({
            error : true,
            message : "Missing body parameter",
            info : []
        });
    } else if (req.params.playerId.toString().length != 4) {
        res.status(400).json({
            error : true,
            message : "Invalid parameter (playerId) length"
        });
    } else {
        Stat.removeByWeekId(req.params.player, req.params.week, 
            function (err, stats) {
                if (err)
                    res.json(err);
                else
                    res.json({
                        status : 'Successfully Removed', 
                        info : stats
                    }
                );
            }
        );
    }
};