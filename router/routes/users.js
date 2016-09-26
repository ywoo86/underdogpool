const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/new', function (req, res) {
  res.render('users/new');
});

router.post('/create', db.create_user, function (req, res) {
  if(res.error){
    res.render('users/new', {error: res.error});
  } else {
    res.redirect('/');
  }
});


module.exports = router;
