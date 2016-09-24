const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
  if(!req.session.user){
    res.render('index');
    // res.redirect('sessions/new');
  } else {
    res.render('index', { 'email': req.session.user.email, 'user_id': req.session.user.id });
  }
});

module.exports = router;
