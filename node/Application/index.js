'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.API = exports.Visual = exports.Application = exports.server = undefined;
exports.listen = listen;

var _spdy = require('spdy');

var _spdy2 = _interopRequireDefault(_spdy);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectRedis = require('connect-redis');

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _SSL = require('../SSL');

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _Visual = require('./Visual');

var _Visual2 = _interopRequireDefault(_Visual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisStore = (0, _connectRedis2.default)(_expressSession2.default);
var client = _redis2.default.createClient();
var Application = (0, _express2.default)();

Application.use(function xPowered(req, res, next) {
    res.header("X-powered-by", "Instak");
    if (!req.header) {
        return next();
    }
    if (req.headers.host.match(/^www/) === null) {
        return next();
    }
    res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
});
Application.use((0, _cors2.default)());

Application.use(_bodyParser2.default.json());
Application.use(_bodyParser2.default.urlencoded({ extended: true }));
Application.use((0, _cookieParser2.default)());
Application.use((0, _expressSession2.default)({
    secret: 'kswby&k3mb§GHksp22v',
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: false,
    resave: false,
    maxAge: new Date(Date.now() + 3600000)
}));

Application.use('/api', _API2.default);
Application.use(_Visual2.default);

var server = exports.server = _spdy2.default.createServer({
    key: _SSL.key,
    cert: _SSL.cert
}, Application);
exports.Application = Application;
exports.Visual = _Visual2.default;
exports.API = _API2.default;
function listen() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3200;

    console.log('App port', port);
    Application.set('port', port);
    return new Promise(function (resolve, reject) {
        server.listen(port, function (error) {
            console.log('Application Server listening on :' + port + ' is', error ? 'failed' : 'success');
            if (error) {
                return reject(error);
            }
            resolve(server);
        });
    });
}