var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new VKontakteStrategy({
        clientID: '7315956', // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
        clientSecret: '7fYF19XiTs4oGoCd1xCv',
        callbackURL: "/vkcallback",
        apiVersion: '5.103',
        profileFields: ['photo_100']
    },
    function verify(accessToken, refreshToken, params, profile, done) {

        // asynchronous verification, for effect...
        process.nextTick(function () {
            console.log(accessToken);
            console.log(profile);
            let user = {
                'token': accessToken,
                'name': profile.displayName,
                'photoURL': profile.photos[1].value
            };

            return done(null, user);
        });
    }
));


var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'anything'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
