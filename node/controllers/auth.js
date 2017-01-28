'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signUp = exports.authenticate = exports.verify = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Models = require('../Models');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'j&k2b`72befcl/He3';
var getTokenResponse = function getTokenResponse(user) {
    return {
        response: {
            user: user.toJSON(),
            token: _jsonwebtoken2.default.sign([user.id, user.username, user.password], secret)
        }
    };
};

var verify = exports.verify = function verify(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.json({
            error: "auth.token.empty"
        });
    }
    _jsonwebtoken2.default.verify(token, secret, function (error, decoded) {
        if (error) {
            return res.json({
                error: 'auth.token.bad'
            });
        }
        console.log(decoded);
        req.loggedIn = decoded;
        next();
    });
};

var authenticate = exports.authenticate = function authenticate(req, res, next) {
    _Models.User.findOne({
        where: {
            $or: {
                username: req.body.username,
                email: req.body.username
            }
        }
    }).then(function (user) {
        if (!user) {
            return res.json({
                error: 'auth.badUsername'
            });
        }
        if (!user.verifyPassword(req.body.password)) {
            return res.json({
                error: 'auth.badPassword'
            });
        }
        res.json(getTokenResponse(user));
    });
};

var signUp = exports.signUp = function signUp(req, res, next) {
    _Models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (user) {
            return res.json({
                error: 'auth.signup.emailBusy'
            });
        }
        _Models.User.create(_lodash2.default.pick(req.body, ['email', 'username', 'password', 'firstName', 'lastName'])).then(function (user) {
            res.send(getTokenResponse(user));
        });
    });
};