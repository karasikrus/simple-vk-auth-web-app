var express = require('express');
var router = express.Router();
var request = require('request');
const passport = require('passport');

router.get('/', function (req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/user');
    }
    res.render('index', {title: 'Express'});
});
router.post('/auth',
    passport.authenticate('vkontakte'),
    function (req, res) {
    }
);
router.post('/logout',
    function (req, res) {
    req.logout();
    res.redirect('/');
    }
);

router.get('/vkcallback',
    passport.authenticate('vkontakte'),
    function (req, res) {
        res.redirect('/user');
    });
router.get('/user', ensureAuthenticated,
    function (req, res) {
        let vkAPIFriendsURL = 'https://api.vk.com/method/friends.get?order=random&count=5&fields=photo_100&access_token=' +
            req.user.token + '&v=5.103'
        request(vkAPIFriendsURL, function (error, response, body) {
            req.user.friends = JSON.parse(body).response.items;
            res.render('user', {user: req.user});
        });
    });
router.get('/friends', ensureAuthenticated,
    function (req, res) {
    let vkAPIFriendsURL = 'https://api.vk.com/method/friends.get?order=random&count=5&fields=photo_100&access_token=' +
        req.user.token + '&v=5.103';
    request(vkAPIFriendsURL, function (error, response, body) {
        const friends = JSON.parse(body).response.items;
        res.send(friends);
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

module.exports = router;
