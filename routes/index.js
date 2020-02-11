var express = require('express');
var router = express.Router();
const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/auth',
    passport.authenticate('vkontakte', {
        display: 'popup', scope: ['friends'],
        failureRedirect: '/login'
    }),
    function (req, res) {

    }
);
router.get('/vkcallback',
    passport.authenticate('vkontakte', {
        failureRedirect: '/login', display: 'popup',
        scope: ['friends']
    }),
    function (req, res) {
        console.log(req.user);
        res.redirect('/users');
    });
router.get('/users', function (req, res, next) {
        res.send('auth complete');
    }
)

module.exports = router;
