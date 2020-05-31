'user strict';
var sql = require('../../../database.js');

// Player Object Constructor
var Stat = function(stat){
    this.playerId = stat.playerId;
    this.week = stat.week;
    this.gp = stat.gp;
    this.pts = stat.pts;
    this.ast = stat.ast;
    this.reb = stat.reb;
    this.stl = stat.stl;
    this.blk = stat.blk;
    this.trn = stat.trn;
};

Stat.getStatById = function (playerId, result) {
    sql.query("SELECT * FROM player_data WHERE player_id = ?", [playerId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('stats : ', res);
            result(null, res);
        }
    });
};
Stat.getPlayerByIdWeek = function (playerId, week, result) {
    sql.query("SELECT * FROM player_data WHERE player_id = ? AND week = ?", [playerId, week], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('stats : ', res);
            result(null, res);
        }
    });
};
Stat.updateByIdWeek = function(playerId, week, pts, ast, reb, stl, blk, trn, result){
    sql.query("UPDATE player_data SET pts = ?, ast = ?, reb = ?, stl = ?, blk = ?, trn = ? WHERE player_id = ? AND week = ?",
        [pts, ast, reb, stl, blk, trn, playerId, week], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('stats : ', res);
                result(null, res);
            }
        });
};
Stat.add = function(stat, result){
    sql.query("INSERT INTO player_data VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [stat.playerId, stat.week, stat.pts, stat.ast, stat.reb, stat.stl, stat.blk, stat.trn], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
};
Stat.remove = function(playerId, result){
    sql.query("DELETE FROM player_data WHERE player_id = ?", [playerId], function (err, res) {
       if(err) {
           console.log("error: ", err);
           result(err, null);
       } else {
           result(null, res);
       }
    });
};

module.exports = Stat;