'user strict';
var sql = require('../../../database.js');

var Stat = function(stat) {
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
    sql.query("SELECT * FROM player_data WHERE player_id = ?", [playerId], 
        function (err, res) {
            if(err)
                result(err, null);
            else
                result(null, res);
        }
    );
};
Stat.getPlayerByIdWeek = function (playerId, week, result) {
    sql.query("SELECT * FROM player_data WHERE player_id = ? AND week = ?", [playerId, week], 
        function (err, res) {
            if(err)
                result(err, null);
            else
                result(null, res);
        }
    );
};
Stat.updateByIdWeek = function(playerId, week, stat, result){
    sql.query("UPDATE player_data SET gp = ?, pts = ?, ast = ?, reb = ?, stl = ?, blk = ?, trn = ? WHERE player_id = ? AND week = ?",
        [stat.gp, stat.pts, stat.ast, stat.reb, stat.stl, stat.blk, stat.trn, playerId, week],
        function (err, res) {
            if(err)
                result(err, null);
            else
                result(null, res);
        }
    );
};
Stat.add = function(playerId, stat, result){
    sql.query("INSERT INTO player_data (`player_id`, `week`, `gp`, `pts`, `ast`, `reb`, `stl`, `blk`, `trn`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [playerId, stat.week, stat.gp, stat.pts, stat.ast, stat.reb, stat.stl, stat.blk, stat.trn], 
        function (err, res) {
            if(err)
                result(err, null);
            else
                result(null, res);
        }
    );
};
Stat.removeByPlayerId = function(playerId, result){
    sql.query("DELETE FROM player_data WHERE player_id = ?", [playerId], 
        function (err, res) {
            if(err)
                result(err, null);
            else
                result(null, res);
        }
    );
};
Stat.removeByWeekId = function(playerId, weekId, result) {
    sql.query("DELETE FROM player_data WHERE player_id = ? AND week = ?", [playerId, weekId], 
        function (err, res) {
            if (err)
                result(err, null);
            else
                result(null, res);
        }
    );
}

module.exports = Stat;