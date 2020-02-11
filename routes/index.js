var express = require('express');
var router = express.Router();
var request = require('request');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/users');
    }
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
router.get('/users', ensureAuthenticated,
    function (req, res) {
        console.log(req.user);
        let vkAPIFriendsURL = 'https://api.vk.com/method/friends.get?order=random&count=5&fields=photo_100&access_token=' +
            req.user.token + '&v=5.103'
        request(vkAPIFriendsURL, function (error, response, body) {
            req.user.friends = JSON.parse(body).response.items;
            console.log('userUpdated = ', req.user);
            res.render('user', {user: req.user});
        });
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

module.exports = router;
