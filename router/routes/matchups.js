const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
// const db = require('../../db/db');
const db2 = pgp('postgres://youngwoo@localhost:5432/underdogpool');

// const db2 = pgp(process.env.DATABASE_URL);

  router.get('/:week', function(req, res){
    var week = req.params.week;
    db2.any(
      "SELECT * FROM matchups m JOIN teams t ON m.home_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC", [week])
    .then(function(homeData){
      db2.any(
        "SELECT * FROM matchups m JOIN teams t ON m.away_id = t.teams_id WHERE week = $1 ORDER BY m.matchups_id ASC", [week])
      .then(function(awayData){
        res.send({home: homeData, away: awayData});
      })
    })
  });

  router.post('/', function(req, res){
    var id = req.session.user.id;
    var game_picked_id = req.body.game_picked;
    var team_picked_id = req.body.team_picked;


    db2.none(
      "INSERT INTO picks (picks_user_id, game_picked_id, team_picked_id) VALUES ($1, $2, $3)", [id, game_picked_id, team_picked_id])
    .catch(function(){
      res.error = "Error: Picks not confirmed";
      next();
    }).then(function(){

      // may have to call to db for information about users picks per week
      res.redirect('/users/show')
    })
  });

module.exports = router;
