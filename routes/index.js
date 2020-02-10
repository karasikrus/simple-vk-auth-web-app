var express = require('express');
var router = express.Router();
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/auth',
  passport.authenticate('vkontakte', { display: 'popup', scope: ['status', 'friends'],
    failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/users');
    }
);

module.exports = router;
