'user strict';
var sql = require('../database.js');

// Player Object Constructor
var Player = function(player){
    this.playerId = player.playerId;
    this.full_name = player.full_name;
    this.team = player.team;
    this.number = player.number;
    this.image = player.image;
    this.position = player.position;
};
Player.getPlayerById = function (playerId, result) {
    sql.query("SELECT * FROM player WHERE player_id = ?", [playerId], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log('player : ', res);
            result(null, res);
        }
    });
};
Player.getAllPlayers = function (result) {
    sql.query("Select * from player", [], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('players : ', res);
            result(null, res);
        }
    });
};
Player.updateById = function(player_id, full_name, team, number, image, position, result){
    sql.query("UPDATE player SET full_name = ?, team = ?, number = ?, image = ?, position = ?, number = ? WHERE player_id = ?",
        [full_name, team, number, image, position, number, player_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Player.remove = function(player_id, result){
    sql.query("DELETE FROM player WHERE player_id = ?", [player_id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};
Player.add = function(player, result){
    sql.query("INSERT INTO player VALUES (?, ?, ?, ?, ?, ?, ?)",
        [player.player_id, player.full_name, player.team, player.number, player.image, player.position], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports= Player;