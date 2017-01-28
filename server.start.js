/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _all = __webpack_require__(59);

var models = _interopRequireWildcard(_all);

var _sequelize = __webpack_require__(50);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = __webpack_require__(38);

var _config2 = _interopRequireDefault(_config);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var env = process.env.NODE_ENV || 'development';
var config = _config2.default[env];
var sequelize = config.use_env_variable ? new _sequelize2.default(process.env[config.use_env_variable]) : new _sequelize2.default(config.database, config.username, config.password, config);
var db = {};

_lodash2.default.each(models, function (model, name) {
  db[name] = model(sequelize, _sequelize2.default);
});
_lodash2.default.each(db, function (model) {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

module.exports = db;

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("lodash");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.Exceptions = exports.Like = exports.Web = exports.Location = exports.Relationship = exports.Hashtag = exports.Account = exports.Feed = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _instagramPrivateApi = __webpack_require__(46);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _fsExtra = __webpack_require__(45);

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getFile = function getFile(username) {
    var file = _path2.default.join(__dirname, 'cookies/' + username + '.json');
    _fsExtra2.default.createFileSync(file);
    return file;
};

var Account = _instagramPrivateApi.V1.Account,
    Session = _instagramPrivateApi.V1.Session,
    Request = _instagramPrivateApi.V1.Request,
    Exceptions = _instagramPrivateApi.V1.Exceptions,
    Media = _instagramPrivateApi.V1.Media,
    Comment = _instagramPrivateApi.V1.Comment,
    Hashtag = _instagramPrivateApi.V1.Hashtag,
    Like = _instagramPrivateApi.V1.Like,
    Location = _instagramPrivateApi.V1.Location,
    Relationship = _instagramPrivateApi.V1.Relationship,
    Thread = _instagramPrivateApi.V1.Thread,
    Upload = _instagramPrivateApi.V1.Upload,
    Feed = _instagramPrivateApi.V1.Feed,
    Web = _instagramPrivateApi.V1.Web,
    CookieFileStorage = _instagramPrivateApi.V1.CookieFileStorage,
    Device = _instagramPrivateApi.V1.Device;
exports.Feed = Feed;
exports.Account = Account;
exports.Hashtag = Hashtag;
exports.Relationship = Relationship;
exports.Location = Location;
exports.Web = Web;
exports.Like = Like;
exports.Exceptions = Exceptions;
var Instagram = (_temp = _class = function () {
    function Instagram(account) {
        var initSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Instagram);

        this._account = account;
        this._device = new Device(account.username);
        this._storage = new CookieFileStorage(getFile(account.username));
        if (initSession) {
            this._session = new Session(this._device, this._session);
            this._session.setProxy(Instagram.getProxyURL(account.proxy));
        }
    }

    _createClass(Instagram, [{
        key: 'login',
        value: function login(password) {
            return Session.create(this._device, this._storage, this.account.username, password, Instagram.getProxyURL(this.account.proxy));
        }
    }, {
        key: 'getById',
        value: function getById(id) {
            return Account.getById(this._session, id);
        }
    }, {
        key: 'getByUsername',
        value: function getByUsername(username) {
            return Account.searchForUser(this.session, username);
        }
    }, {
        key: 'account',
        get: function get() {
            return this._account;
        }
    }, {
        key: 'session',
        get: function get() {
            return this._session;
        }
    }], [{
        key: 'getProxyURL',
        value: function getProxyURL(proxy) {
            return 'http://' + proxy.auth + '@' + proxy.host;
        }
    }, {
        key: 'get',
        value: function get(account) {
            var initSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return account.getProxy(function (proxy) {
                account.proxy = proxy;
                return new Instagram(account, initSession);
            });
        }
    }]);

    return Instagram;
}(), _class.Account = Account, _class.Hashtag = Hashtag, _class.Relationship = Relationship, _class.Location = Location, _class.Web = Web, _class.Exceptions = Exceptions, _class.Like = Like, _temp);
exports.default = Instagram;
/* WEBPACK VAR INJECTION */}.call(exports, "Server/API/Instagram"))

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*import _ from 'lodash'

export const create = (key, names, prefix = '')=> {
    if (_.isObject(names)) {
        return _.assign(..._.map(names, (value, name)=>(
            create(key, value, prefix + name + '.')
        )))
    }
    return _.zipObject(
        map(names, name=> prefix + name.replace('.', '_').toUpperCase()),
        map(names, name=> new Error(`${key}.${name}`))
    );
};

export const AUTH = create('auth', {
    user: ['bad', 'username', 'password'],
    token: ['bad', 'empty']
});*/

var AUTH_USER_BAD = exports.AUTH_USER_BAD = new Error('auth.user.bad');
var AUTH_TOKEN_BAD = exports.AUTH_TOKEN_BAD = new Error('auth.token.bad');
var AUTH_TOKEN_EMPTY = exports.AUTH_TOKEN_EMPTY = new Error('auth.token.empty');
var AUTH_USER_USERNAME = exports.AUTH_USER_USERNAME = new Error('auth.user.username');
var AUTH_USER_PASSWORD = exports.AUTH_USER_PASSWORD = new Error('auth.user.password');
var AUTH_USER_EMAIL_BUSY = exports.AUTH_USER_EMAIL_BUSY = new Error('auth.user.emailBusy');

var USER_LICENSE_BAD = exports.USER_LICENSE_BAD = new Error('user.license.bad');
var USER_ACCOUNT_LIMIT = exports.USER_ACCOUNT_LIMIT = new Error('user.account.limit');
var USER_ACCOUNT_REQUIRE = exports.USER_ACCOUNT_REQUIRE = new Error('user.account.require');
var USER_ACCOUNT_BAD = exports.USER_ACCOUNT_BAD = new Error('user.account.bad');

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sendErrorMessage = exports.sendErrorMessage = function sendErrorMessage(res, error) {
    return res.send({ error: error });
};
var sendError = exports.sendError = function sendError(res, error) {
    var req = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (process.env.NODE_ENV === 'development') {
        console.error('#PROMISIFY - ERROR', req.url, error.message);
    }
    sendErrorMessage(res, error.message);
};
var send = exports.send = function send(res, response) {
    return res.send({ response: response });
};
var promisify = exports.promisify = function promisify(callback) {
    var isMiddleware = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function promisifiedRoute(req, res, next) {
        try {
            callback(req, res, next).then(function (response) {
                if (isMiddleware) {
                    next();
                } else {
                    send(res, response);
                    if (process.env.NODE_ENV === 'development') {
                        console.error('#PROMISIFY - RESPONSE', req.url, JSON.stringify(response, null, 4));
                    }
                }
            }).catch(function (error) {
                return sendError(res, error, req);
            });
        } catch (error) {
            sendError(res, error, req);
        }
    };
};

var log = exports.log = function log() {
    for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
        message[_key] = arguments[_key];
    }

    if (process.env.NODE_ENV === 'test') {
        var _console;

        (_console = console).log.apply(_console, ['#LOG - '].concat(message));
    }
};

var logSingle = exports.logSingle = function logSingle(message) {
    log(message);
    return message;
};

var logKey = exports.logKey = function logKey(name) {
    return function (message) {
        console.log('result for ', name);
        log(name, message);
        return message;
    };
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyAccountsCount = exports.getAccountsCount = exports.associations = undefined;

var _Models = __webpack_require__(0);

var _License = __webpack_require__(15);

var _associations = __webpack_require__(36);

var associations = _interopRequireWildcard(_associations);

var _errors = __webpack_require__(4);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.associations = associations;
var getAccountsCount = exports.getAccountsCount = function getAccountsCount(user) {
    return Promise.all([associations.verifyLicense(user), associations.getAccounts(user)]).then(function () {
        return (0, _License.getAccounts)(user.license) - user.accounts.length;
    });
};

var verifyAccountsCount = exports.verifyAccountsCount = function verifyAccountsCount(user) {
    return getAccountsCount(user).then(function (count) {
        console.log('accounts count', count);
        if (count === 0) {
            throw _errors.USER_ACCOUNT_LIMIT;
        }
        return count;
    });
};

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Visual = exports.Application = exports.server = undefined;
exports.listen = listen;

var _spdy = __webpack_require__(51);

var _spdy2 = _interopRequireDefault(_spdy);

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(39);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = __webpack_require__(42);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = __webpack_require__(43);

var _cors2 = _interopRequireDefault(_cors);

var _expressSession = __webpack_require__(44);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectRedis = __webpack_require__(41);

var _connectRedis2 = _interopRequireDefault(_connectRedis);

var _redis = __webpack_require__(49);

var _redis2 = _interopRequireDefault(_redis);

var _SSL = __webpack_require__(29);

var _Visual = __webpack_require__(25);

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

Application.use(_Visual2.default);

var server = exports.server = _spdy2.default.createServer({
    key: _SSL.key,
    cert: _SSL.cert
}, Application);
exports.Application = Application;
exports.Visual = _Visual2.default;
function listen() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3200;

    //console.log('App port', port);
    Application.set('port', port);
    return new Promise(function (resolve, reject) {
        server.listen(port, function (error) {
            //console.log(`Application Server listening on :${port} is`,error?'failed':'success');
            if (error) {
                return reject(error);
            }
            resolve(server);
        });
    });
}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLocalhost = isLocalhost;

var _os = __webpack_require__(48);

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifaces = _os2.default.networkInterfaces();
var ips = ['127.0.0.1'];
var hashSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function isLocalhost() {
    return ifaces.en0 && (ips.indexOf(ifaces.en0[0].address) > -1 || ips.indexOf(ifaces.en0[1].address) > -1) || ifaces.eth0 && (ips.indexOf(ifaces.eth0[0].address) > -1 || ips.indexOf(ifaces.eth0[1].address) > -1) || ifaces.lo0 && (ips.indexOf(ifaces.lo0[0].address) > -1 || ips.indexOf(ifaces.lo0[1].address) > -1);
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _Request = __webpack_require__(21);

var request = _interopRequireWildcard(_Request);

var _Filter = __webpack_require__(19);

var filter = _interopRequireWildcard(_Filter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskRuleSet = (_temp = _class = function () {
    function TaskRuleSet() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, TaskRuleSet);

        this.options = _lodash2.default.merge({}, TaskRuleSet.options, options);
    }

    _createClass(TaskRuleSet, [{
        key: 'execute',
        value: function execute(runner) {}
    }, {
        key: 'getTarget',
        value: function getTarget(runner) {
            var _this = this;

            var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (runner.target) {
                return Promise.resolve();
            }
            if (strict) {
                return Promise.reject();
            }
            return this.options.request[runner.settings.sourceType](runner).then(function (_ref) {
                var session = _ref.session,
                    data = _ref.data;

                if (!session.moreAvailable) {
                    session.cursor = null;
                }
                runner.data = (data || []).filter(function (item) {
                    return _this.filterItem(runner, item);
                });
                session.sourceIndex = ++runner.task.session.sourceIndex;
                return runner.task.updateSession(session);
            });
        }
    }, {
        key: 'filterTarget',
        value: function filterTarget(runner) {
            if (!this.filterItem(runner, runner.target)) {
                runner.data.splice(0, 1);
                return false;
            }
            return true;
        }
    }, {
        key: 'filterItem',
        value: function filterItem(runner, item) {
            return _lodash2.default.every(this.options.filter, function (filter, name) {
                return filter(item, runner.settings.filter[name]);
            });
        }
    }, {
        key: 'isSourceTypeSupported',
        value: function isSourceTypeSupported(type) {
            return !!this.options.request[type];
        }
    }]);

    return TaskRuleSet;
}(), _class.options = {
    request: request,
    filter: filter
}, _temp);
exports.default = TaskRuleSet;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.follow = undefined;

var _follow2 = __webpack_require__(23);

var _follow3 = _interopRequireDefault(_follow2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.follow = _follow3.default;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.refresh = exports.reLoggedIn = exports.updateSettings = exports.destroy = exports.login = exports.promisifyCurrentAccount = exports.getInstagram = exports.getCurrentFromRequest = undefined;

var _Models = __webpack_require__(0);

var _User = __webpack_require__(6);

var _Proxy = __webpack_require__(16);

var _helpers = __webpack_require__(5);

var _Instagram = __webpack_require__(3);

var _Instagram2 = _interopRequireDefault(_Instagram);

var _errors = __webpack_require__(4);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var find = function find(accounts, id) {
    return _lodash2.default.find(accounts, ['id', id]);
};

var getCurrentFromRequest = exports.getCurrentFromRequest = function getCurrentFromRequest(req) {
    var id = req.params.accountId || req.body.accountId || req.query.accountId;
    if (!id) {
        throw _errors.USER_ACCOUNT_REQUIRE;
    }
    return _User.associations.getFromRequest(req).then(function (user) {
        var account = find(user.accounts, id);
        if (!account) {
            throw _errors.USER_ACCOUNT_BAD;
        }
        return account;
    });
};

var getInstagram = exports.getInstagram = function getInstagram(account) {
    return _Instagram2.default.get(account);
};

var promisifyCurrentAccount = exports.promisifyCurrentAccount = function promisifyCurrentAccount(callback) {
    return (0, _helpers.promisify)(function (req) {
        return getCurrentFromRequest(req).then(function (account) {
            return callback(account, req);
        });
    });
};

var instagramLogin = function instagramLogin(instagram, account, req) {
    return instagram.login(req.body.password).then(function (session) {
        return session.getAccount();
    }).then(function (_ref) {
        var profile = _ref.params;
        return account.updateSettings({ profile: profile }).then(function () {
            return { account: account, profile: profile };
        });
    });
};

var login = exports.login = (0, _helpers.promisify)(function (req) {
    return _User.associations.getFromRequest(req).then(function (user) {
        return (0, _User.verifyAccountsCount)(user).then(_Proxy.getAvailable).then(_Proxy.verify).then(function (proxy) {
            return _Models.Account.create({
                username: req.body.username
            }).then(function (account) {
                return Promise.all([user.addAccount(account), account.setProxy(proxy)]).then(function () {
                    return new _Instagram2.default(account, false);
                }).then(function (instagram) {
                    return instagramLogin(instagram, account, req);
                });
            });
        });
    });
});

var destroy = exports.destroy = promisifyCurrentAccount(function (account) {
    return account.destroy().then(function () {
        return true;
    });
});

var updateSettings = exports.updateSettings = promisifyCurrentAccount(function (account, req) {
    return account.updateSettings(req.body.value).then(function (account) {
        return account.get();
    });
});

var reLoggedIn = exports.reLoggedIn = promisifyCurrentAccount(function (account, req) {
    return (0, _Proxy.getAvailable)().then(_Proxy.verify).then(function (proxy) {
        return account.setProxy(proxy);
    }).then(function () {
        return _Instagram2.default.get(account);
    }).then(function (instagram) {
        return instagramLogin(instagram, account, req);
    });
});

var refresh = exports.refresh = promisifyCurrentAccount(function (account) {
    return _Instagram2.default.get(account).then(function (instagram) {
        return instagram.getById(account.settings.profile.id);
    }).then(function (_ref2) {
        var profile = _ref2.params;
        return account.updateSettings({ profile: profile }).then(function () {
            return { account: account, profile: profile };
        });
    });
});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Search = undefined;

var _Account = __webpack_require__(13);

Object.keys(_Account).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Account[key];
    }
  });
});

var _Search2 = __webpack_require__(32);

var _Search = _interopRequireWildcard(_Search2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Search = _Search;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAccounts = undefined;

var _Models = __webpack_require__(0);

var _License = __webpack_require__(28);

var getAccounts = exports.getAccounts = function getAccounts(license) {
    if (!license) {
        return 0;
    }
    if (!license.isActive) {
        return 0;
    }
    return _License.Types[license.type].accounts || 0;
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify = exports.getAvailable = undefined;

var _Models = __webpack_require__(0);

var getAvailable = exports.getAvailable = function getAvailable() {
    return _Models.Proxy.findOne({
        where: {
            AccountId: null
        }
    });
};

var verify = exports.verify = function verify(proxy) {
    if (!proxy || !proxy.id) {
        throw new Error('proxy.empty');
    }
    return proxy;
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Application = __webpack_require__(9);

var _controllers = __webpack_require__(37);

var _helpers = __webpack_require__(5);

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routeNames = ['API', 'auth', 'account', 'task'];
var router = _lodash2.default.zipObject(routeNames, _lodash2.default.map(routeNames, function (name) {
  return _express2.default.Router();
}));
routeNames = null;

router.auth.post('/signup', _controllers.Auth.signUp);
router.auth.post('/login', _controllers.Auth.authenticate);

router.account.use((0, _helpers.promisify)(_controllers.User.associations.getFromRequest, true));
router.account.post('/login', _controllers.Account.login);
router.account.post('/:accountId/refresh', _controllers.Account.refresh);
router.account.post('/:accountId/relogin', _controllers.Account.reLoggedIn);
router.account.delete('/:accountId', _controllers.Account.destroy);
router.account.get('/:accountId/search/hashtag', _controllers.Account.Search.hashtag);
router.account.get('/:accountId/search/account', _controllers.Account.Search.account);

router.API.use(_controllers.Auth.token.verify);
router.API.use('/account', router.account);

_Application.Application.use('/auth', router.auth);
_Application.Application.use('/api', router.API);

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("events");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.link = exports.picture = exports.business = exports.privacy = exports.media = exports.followings = exports.followers = undefined;

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var counterFilter = function counterFilter(name) {
    return function (account, filter) {
        return !_lodash2.default.isNumber(account[name]) || (!_lodash2.default.isNumber(filter.min) || account[name] < filter.min) && (!_lodash2.default.isNumber(filter.max) || account[name] > filter.max);
    };
};

var ruleFilter = function ruleFilter(name) {
    return function (account, filter) {
        return !filter || filter === 1 && !!account[name] || filter === 2 && !account[name];
    };
};

var followers = exports.followers = counterFilter('followerCount');
var followings = exports.followings = counterFilter('followingCount');
var media = exports.media = counterFilter('mediaCount');
var privacy = exports.privacy = ruleFilter('isPrivate');
var business = exports.business = ruleFilter('isBusiness');
var picture = exports.picture = ruleFilter('picture');
var link = exports.link = ruleFilter('externalUrl');

/***/ },
/* 20 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = feedRequest;
function getFeed(feed, session, source, cursor) {
    feed = new feed(session, source);
    if (cursor) {
        feed.setCursor(cursor);
    }
    return feed.get().then(function (data) {
        return {
            session: {
                moreAvailable: feed.moreAvailable,
                cursor: feed.cursor
            },
            data: data
        };
    });
}

function feedRequest(feed) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function wrappedFeedRequest(runner) {
        if (!runner.task.session.moreAvailable) {
            return Promise.resolve(null);
        }
        var source = runner.source;
        if (options.getSource) {
            source = options.getSource(source);
        }
        return getFeed(feed, runner.instagram.session, source, runner.task.session.cursor).then(function (result) {
            if (options.getItem && result.data) {
                result.data = result.data.map(options.getItem);
            }
            return result;
        });
    };
}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.location = exports.place = exports.hashtag = exports.followings = exports.followers = undefined;

var _Instagram = __webpack_require__(3);

var _feed = __webpack_require__(20);

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultGetSource = function defaultGetSource(source) {
    return source.id;
};

var mediaExecute = function mediaExecute(_ref) {
    var account = _ref.account;
    return account;
};

var execution = function execution(feedAction) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        getSource: defaultGetSource,
        getItem: null
    };
    return (0, _feed2.default)(feedAction, options);
};

var followers = exports.followers = execution(_Instagram.Feed.AccountFollowers);
var followings = exports.followings = execution(_Instagram.Feed.AccountFollowing);
var hashtag = exports.hashtag = execution(_Instagram.Feed.TaggedMedia, {
    getItem: mediaExecute,
    getSource: function getSource(_ref2) {
        var name = _ref2.name;
        return name;
    }
});
var place = exports.place = execution(_Instagram.Feed.LocationMedia, {
    getItem: mediaExecute,
    getSource: function getSource(_ref3) {
        var id = _ref3.id;
        return id;
    }
});
var location = exports.location = place;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Instagram = __webpack_require__(3);

var _Instagram2 = _interopRequireDefault(_Instagram);

var _Type = __webpack_require__(12);

var types = _interopRequireWildcard(_Type);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ERROR_NOT_ACTIVE = new Error('TaskNotActive');
var ERROR_LICENSE = new Error('TaskBadLicense');
var ERROR_BAD_TYPE = new Error('TaskBadType');

var TaskRunner = function () {
    _createClass(TaskRunner, [{
        key: 'task',
        get: function get() {
            return this._task;
        }
    }, {
        key: 'account',
        get: function get() {
            return this._account;
        }
    }, {
        key: 'instagram',
        get: function get() {
            return this._instagram;
        }
    }, {
        key: 'user',
        get: function get() {
            return this._user;
        }
    }, {
        key: 'source',
        get: function get() {
            return this._task.settings.source[this._task.session.sourceIndex];
        }
    }, {
        key: 'target',
        get: function get() {
            if (!this.data || this.data.length === 0) {
                return null;
            }
            return this.data[0];
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        },
        set: function set(value) {
            this._data = value;
        }
    }]);

    function TaskRunner(task) {
        var _this = this;

        _classCallCheck(this, TaskRunner);

        if (!types[task.type]) {
            return Promise.reject(ERROR_BAD_TYPE);
        }

        this._ruleset = types[task.type];
        this._task = task;
        this._timeout = null;
        this._time = null;
        this._data = null;

        if (!this._ruleset.isSourceTypeSupported(task.settings.type)) {
            this.destroy();
            return Promise.reject(new Error('SourceTypeIsNotSupported'));
        }

        return task.updateSession(_lodash2.default.defaults(task.session, {
            sourceIndex: 0,
            data: null
        })).then(function () {
            return task.getAccount();
        }).then(function (account) {
            _this._account = account;
            return Promise.all([account.getUser(), _Instagram2.default.get(account)]);
        }).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                user = _ref2[0],
                instagram = _ref2[1];

            _this._user = user;
            _this._instagram = instagram;
        }).then(function () {
            return _this.execute();
        });
    }

    _createClass(TaskRunner, [{
        key: 'refresh',
        value: function refresh() {
            var _this2 = this;

            if (this._time < Date.now() - 2000) {
                return Promise.resolve(this);
            }
            return this._task.reload().then(function () {
                if (!_this2._task.isActive) {
                    throw ERROR_NOT_ACTIVE;
                }
                return _this2._user.getLicense();
            }).then(function (license) {
                if (!license || !license.isActive) {
                    throw ERROR_LICENSE;
                }
                license = null;
                _this2._time = Date.now();
                return _this2;
            });
        }
    }, {
        key: 'execute',
        value: function execute() {
            var _this3 = this;

            this.clearTimeout();
            this.refresh().then(function () {
                return _this3._ruleset.getTarget(_this3);
            }).then(function () {
                if (!_this3._ruleset.filterTarget(_this3)) {
                    return _this3.wait(6000);
                }
                return _this3._ruleset.execute(_this3).then(function () {
                    return _this3.wait();
                });
            }).catch(function () {
                return _this3.task.stop().then(function () {
                    return _this3.destroy();
                });
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            delete this._task;
            delete this._account;
            delete this._instagram;
            delete this._time;
            delete this._timeout;
            delete this._user;
            delete this._ruleset;
            return null;
        }
    }, {
        key: 'clearTimeout',
        value: function (_clearTimeout) {
            function clearTimeout() {
                return _clearTimeout.apply(this, arguments);
            }

            clearTimeout.toString = function () {
                return _clearTimeout.toString();
            };

            return clearTimeout;
        }(function () {
            if (this._timeout) {
                clearTimeout(this._timeout);
                this._timeout = null;
            }
        })
    }, {
        key: 'wait',
        value: function wait() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60000;

            this.clearTimeout();
            this._timeout = setTimeout(this.execute.bind(this), time);
        }
    }]);

    return TaskRunner;
}();

exports.default = TaskRunner;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Instagram = __webpack_require__(3);

var _Ruleset = __webpack_require__(11);

var _Ruleset2 = _interopRequireDefault(_Ruleset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Ruleset2.default({

    action: 'follow',
    targetType: 'account',
    execute: function execute(_ref, account) {
        var settings = _ref.task.settings,
            session = _ref.instagram.session;
        var id = account.id;

        return _Instagram.Relationship.create(session, id).then(function () {
            if (!settings.likeMedia) {
                return null;
            }
            return new _Instagram.Feed.UserMedia(session, id).get().then(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 1),
                    post = _ref3[0];

                if (post) {
                    return _Instagram.Like.create(session, post.id);
                }
                return null;
            });
        }).then(function () {
            return {
                type: 'follow',
                status: 'ok',
                account: account.params
            };
        });
    }

});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Type = exports.Ruleset = exports.Runner = undefined;

var _Runner = __webpack_require__(22);

var _Runner2 = _interopRequireDefault(_Runner);

var _Ruleset = __webpack_require__(11);

var _Ruleset2 = _interopRequireDefault(_Ruleset);

var _Type = __webpack_require__(12);

var Type = _interopRequireWildcard(_Type);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Runner = _Runner2.default;
exports.Ruleset = _Ruleset2.default;
exports.Type = Type;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(40);

var _compression2 = _interopRequireDefault(_compression);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Application = (0, _express2.default)();

Application.set('views', _path2.default.join(__dirname, 'View'));
Application.set('view engine', 'ejs');
Application.set('view cache', true);
Object.assign(Application.locals, {
    files: {
        js: [],
        css: []
    },
    version: 1,
    title: 'Untitle page'
});

Application.use((0, _compression2.default)());
Application.use(_express2.default.static(_path2.default.join(__dirname, '../../../public'), { maxAge: 604800000 }));

exports.default = Application;
/* WEBPACK VAR INJECTION */}.call(exports, "Server/Application/Visual"))

/***/ },
/* 26 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PASSIVE = exports.PASSIVE = '0';
var ACTIVE = exports.ACTIVE = '1';

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var start = exports.start = {
    accounts: 3,
    price: 12
};

var standart = exports.standart = {
    accounts: 5,
    price: 25
};

var premium = exports.premium = {
    accounts: 7,
    price: 40
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = exports.Types = undefined;

var _Types = __webpack_require__(27);

var Types = _interopRequireWildcard(_Types);

var _Status = __webpack_require__(26);

var Status = _interopRequireWildcard(_Status);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Types = Types;
exports.Status = Status;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csr = exports.cert = exports.key = undefined;

var _utils = __webpack_require__(10);

var _instak = __webpack_require__(30);

var instakMe = _interopRequireWildcard(_instak);

var _localhost = __webpack_require__(31);

var localhost = _interopRequireWildcard(_localhost);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var SSL = (0, _utils.isLocalhost)() ? localhost : instakMe;

var key = exports.key = SSL.key;
var cert = exports.cert = SSL.cert;
var csr = exports.csr = SSL.crt;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cert = exports.key = undefined;

var _fs = __webpack_require__(8);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = exports.key = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/instak.me/server.key'), 'utf8');
var cert = exports.cert = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/instak.me/server.crt'), 'utf8');
/* WEBPACK VAR INJECTION */}.call(exports, "Server/SSL/instak.me"))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csr = exports.cert = exports.key = undefined;

var _fs = __webpack_require__(8);

var _fs2 = _interopRequireDefault(_fs);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = exports.key = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/localhost/server.key'), 'utf8');
var cert = exports.cert = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/localhost/server.crt'), 'utf8');
var csr = exports.csr = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/localhost/server.csr'), 'utf8');
/* WEBPACK VAR INJECTION */}.call(exports, "Server/SSL/localhost"))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.account = exports.hashtag = undefined;

var _Account = __webpack_require__(13);

var _Instagram = __webpack_require__(3);

var _helpers = __webpack_require__(5);

var wrapSearch = function wrapSearch(model) {
    return (0, _Account.promisifyCurrentAccount)(function (account, req) {
        return (0, _Account.getInstagram)(account).then(function (_ref) {
            var session = _ref.session;
            return model.search(session, req.query.q);
        }).then(function (items) {
            return items.map(function (item) {
                return item.params;
            });
        });
    });
};

var hashtag = exports.hashtag = wrapSearch(_Instagram.Hashtag);

var account = exports.account = wrapSearch(_Instagram.Account);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signUp = exports.authenticate = exports.token = undefined;

var _token = __webpack_require__(34);

var token = _interopRequireWildcard(_token);

var _helpers = __webpack_require__(5);

var _Models = __webpack_require__(0);

var _errors = __webpack_require__(4);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.token = token;
var authenticate = exports.authenticate = (0, _helpers.promisify)(function (req) {
    if (!req.body.username) {
        throw _errors.AUTH_USER_USERNAME;
    }
    if (!req.body.password) {
        throw _errors.AUTH_USER_PASSWORD;
    }
    return _Models.User.findOne({
        where: {
            $or: {
                username: req.body.username,
                email: req.body.username
            }
        }
    }).then(function (user) {
        if (!user) {
            throw _errors.AUTH_USER_USERNAME;
        }
        try {
            if (!user.verifyPassword(req.body.password)) {
                throw _errors.AUTH_USER_PASSWORD;
            }
        } catch (e) {
            console.log('Authenticate', req.body, e);
            throw _errors.AUTH_USER_PASSWORD;
        }
        return token.getResponseByUser(user);
    });
});

var signUp = exports.signUp = (0, _helpers.promisify)(function (req) {
    return _Models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (user) {
            throw _errors.AUTH_USER_EMAIL_BUSY;
        }
        return _Models.User.create(_lodash2.default.pick(req.body, ['email', 'username', 'password', 'firstName', 'lastName'])).then(token.getResponseByUser);
    });
});

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verify = exports.getResponseByUser = exports.getByUser = undefined;

var _jsonwebtoken = __webpack_require__(47);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _errors = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'j&k2b`72befcl/He3';

var getByUser = exports.getByUser = function getByUser(user) {
    if (!user.id) {
        throw _errors.AUTH_USER_BAD;
    }
    return _jsonwebtoken2.default.sign({
        id: user.id,
        email: user.email,
        password: user.password
    }, secret);
};

var getResponseByUser = exports.getResponseByUser = function getResponseByUser(user) {
    return {
        user: user.toJSON(),
        token: getByUser(user)
    };
};

var verify = exports.verify = function verify(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        throw _errors.AUTH_TOKEN_EMPTY;
    }
    _jsonwebtoken2.default.verify(token, secret, function (error) {
        if (error) {
            throw _errors.AUTH_TOKEN_BAD;
        }
        req.loggedIn = _lodash2.default.omit(_jsonwebtoken2.default.decode(token, { json: true, complete: true }).payload, ['iat']);
        next();
    });
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = exports.requireAccount = undefined;

var _Models = __webpack_require__(0);

var _helpers = __webpack_require__(5);

var _Account = __webpack_require__(14);

var _User = __webpack_require__(6);

var _Task = __webpack_require__(24);

var requireAccount = exports.requireAccount = function requireAccount(req) {
    var response = {};
    return (0, _User.getFromRequest)(req).then(function (user) {
        return response.user = user;
    }).then(_User.verifyLicense).then(function () {
        return (0, _Account.getCurrent)(req);
    }).then(function (account) {
        return (response.account = account) && response;
    });
};

var create = exports.create = (0, _helpers.promisify)(function (req) {
    var _req$body = req.body,
        filter = _req$body.filter,
        name = _req$body.name,
        type = _req$body.type,
        sourceType = _req$body.sourceType,
        source = _req$body.source;

    if (!type) {
        throw new Error('task.create.require.type');
    }
    if (!sourceType) {
        throw new Error('task.create.require.sourceType');
    }
    if (!source) {
        throw new Error('task.create.require.source');
    }
    if (!source.length) {
        throw new Error('task.create.require.sourceLength');
    }
    requireAccount(req).then(function (_ref) {
        var account = _ref.account;
        return _Models.Task.create({
            name: name,
            type: type,
            settings: {
                sourceType: sourceType,
                source: source,
                filter: filter
            }
        }).then(function (task) {
            return account.addTask(task).then(function () {
                new _Task.Runner(task);
                return task;
            });
        });
    });
});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFromRequest = exports.verifyLicense = exports.getAccounts = exports.getLicense = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Models = __webpack_require__(0);

var _errors = __webpack_require__(4);

var getLicense = exports.getLicense = function getLicense(user) {
    if (user.license !== undefined) {
        return Promise.resolve(user);
    }
    return user.getLicense().then(function (license) {
        user.license = license;
        return user;
    });
};

var getAccounts = exports.getAccounts = function getAccounts(user) {
    if (user.accounts !== undefined) {
        return Promise.resolve(user);
    }
    return user.getAccounts().then(function (accounts) {
        user.accounts = accounts;
        return user;
    });
};

var verifyLicense = exports.verifyLicense = function verifyLicense(user) {
    return getLicense(user).then(function (_ref) {
        var license = _ref.license;

        if (!license || !license.isActive) {
            throw _errors.USER_LICENSE_BAD;
        }
        return user;
    });
};

var getFromRequest = exports.getFromRequest = function getFromRequest(req) {
    if (req.user) {
        return Promise.resolve(req.user);
    }
    return _Models.User.findOne({
        where: req.loggedIn
    }).then(function (user) {
        if (!user) {
            throw _errors.AUTH_TOKEN_BAD;
        }
        return Promise.all([user.getLicense(), user.getAccounts()]).then(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                license = _ref3[0],
                accounts = _ref3[1];

            user.license = license;
            user.accounts = accounts;
            req.user = user;
            return user;
        });
    });
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = exports.License = exports.Proxy = exports.Task = exports.Account = exports.Auth = undefined;

var _Auth = __webpack_require__(33);

var Auth = _interopRequireWildcard(_Auth);

var _Account = __webpack_require__(14);

var Account = _interopRequireWildcard(_Account);

var _User = __webpack_require__(6);

var User = _interopRequireWildcard(_User);

var _License = __webpack_require__(15);

var License = _interopRequireWildcard(_License);

var _Proxy = __webpack_require__(16);

var Proxy = _interopRequireWildcard(_Proxy);

var _Task = __webpack_require__(35);

var Task = _interopRequireWildcard(_Task);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Auth = Auth;
exports.Account = Account;
exports.Task = Task;
exports.Proxy = Proxy;
exports.License = License;
exports.User = User;

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = {
	"development": {
		"username": "derasds4",
		"password": "6c0e14f27b8b427112d26b3ac7662a86",
		"database": "www",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"test": {
		"username": "derasds4",
		"password": "6c0e14f27b8b427112d26b3ac7662a86",
		"database": "www",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"logging": false
	},
	"production": {
		"username": "derasds4",
		"password": "6c0e14f27b8b427112d26b3ac7662a86",
		"database": "www",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"logging": false
	}
};

/***/ },
/* 39 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 40 */
/***/ function(module, exports) {

module.exports = require("compression");

/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = require("connect-redis");

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = require("cookie-parser");

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = require("cors");

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = require("express-session");

/***/ },
/* 45 */
/***/ function(module, exports) {

module.exports = require("fs-extra");

/***/ },
/* 46 */
/***/ function(module, exports) {

module.exports = require("instagram-private-api");

/***/ },
/* 47 */
/***/ function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ },
/* 48 */
/***/ function(module, exports) {

module.exports = require("os");

/***/ },
/* 49 */
/***/ function(module, exports) {

module.exports = require("redis");

/***/ },
/* 50 */
/***/ function(module, exports) {

module.exports = require("sequelize");

/***/ },
/* 51 */
/***/ function(module, exports) {

module.exports = require("spdy");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.events = undefined;

var _Application = __webpack_require__(9);

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _Models = __webpack_require__(0);

var _utils = __webpack_require__(10);

__webpack_require__(17);

var _events = __webpack_require__(18);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.NODE_ENV === 'test' ? 5000 : 8080;
var events = new _events2.default();
var listen = function listen() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _Application.listen)(port).then(function () {
        //console.log("#Server - listening" + message);
        events.emit('ready');
        events.isReady = true;
    });
};
events.onReady = function (callback) {
    if (events.isReady) {
        return callback();
    }
    events.on('ready', callback);
};

_Application.Application.use(function (req, res, next) {
    res.sendfile(_path2.default.join(__dirname, '../public/index.html'));
});

//console.log('#Server - ready');

_Models.sequelize.sync({ force: true }).then(function () {
    //console.log('#Server - Database - Sync success');
    listen();
}).catch(function (error) {
    console.error((0, _utils.isLocalhost)(), error);
    if ((0, _utils.isLocalhost)()) {
        listen(' ( localhost only )');
    }
});

exports.events = events;
exports.default = _Application.Application;
/* WEBPACK VAR INJECTION */}.call(exports, "Server"))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SETTINGS_UPDATE = exports.SETTINGS = undefined;

var _sequelize = __webpack_require__(50);

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {String} name
 * @param defaultValue
 * @constructor
 */
var SETTINGS = exports.SETTINGS = function SETTINGS() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'settings';
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return {};
    };
    return {
        type: _sequelize2.default.TEXT('long'),
        set: function set(value) {
            var json;
            try {
                json = JSON.stringify(value);
            } catch (e) {
                json = this.getDataValue(name) || JSON.stringify(defaultValue());
            }
            this.setDataValue(name, json);
        },
        get: function get() {
            try {
                return JSON.parse('' + this.getDataValue(name));
            } catch (e) {
                return defaultValue();
            }
        }
    };
};

var SETTINGS_UPDATE = exports.SETTINGS_UPDATE = function SETTINGS_UPDATE() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'settings';
    return function updateSettings() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return this.update(_defineProperty({}, name, _lodash2.default.merge(this.getDataValue(name), value)));
    };
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Types = __webpack_require__(53);

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('Account', {
        username: {
            type: STRING(255),
            allowNull: false,
            unique: true
        },
        settings: (0, _Types.SETTINGS)()
    }, {
        classMethods: {
            associate: function associate(_ref2) {
                var Proxy = _ref2.Proxy,
                    Task = _ref2.Task,
                    Account = _ref2.Account;

                Account.hasMany(Task, {
                    as: 'tasks',
                    foreignKeyConstraint: true
                });
                Account.hasOne(Proxy, {
                    as: 'proxy',
                    foreignKeyConstraint: true
                });
                Task.belongsTo(Account);
                Proxy.belongsTo(Account);
            }
        },
        instanceMethods: {
            updateSettings: (0, _Types.SETTINGS_UPDATE)()
        }
    });
};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

var _License = __webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var typeKeys = _lodash2.default.keys(_License.Types);

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING,
        ENUM = _ref.ENUM,
        INTEGER = _ref.INTEGER,
        DATE = _ref.DATE;
    return sequelize.define('License', {
        type: {
            type: ENUM.apply(undefined, _toConsumableArray(typeKeys)),
            defaultValue: typeKeys[0],
            allowNull: false
        },
        startedAt: DATE,
        months: INTEGER,
        status: {
            type: ENUM(_lodash2.default.values(_License.Status)),
            defaultValue: _License.Status.PASSIVE,
            allowNull: true
        }
    }, {
        getterMethods: {
            expiresIn: function expiresIn() {
                var date = new Date(this.startedAt);
                date.setMonth(date.getMonth() + this.months);
                return date;
            },
            isActive: function isActive() {
                return this.status === _License.Status.ACTIVE && this.expiresIn.getTime() > Date.now();
            }
        },
        instanceMethods: {
            activate: function activate() {
                if (this.status === _License.Status.ACTIVE) {
                    throw new Error('License.StatusAlreadyActive');
                }
                return this.update({
                    status: _License.Status.ACTIVE,
                    startedAt: new Date()
                });
            }
        }
    });
};

/***/ },
/* 56 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var proxies = [["81.176.239.222:11649", "J78BiZ:yNexnB"], ["81.176.239.222:11648", "J78BiZ:yNexnB"], ["81.176.239.222:11647", "J78BiZ:yNexnB"], ["81.176.239.222:11646", "J78BiZ:yNexnB"], ["81.176.239.222:11645", "J78BiZ:yNexnB"], ["81.176.239.222:11644", "J78BiZ:yNexnB"], ["81.176.239.222:11643", "J78BiZ:yNexnB"], ["81.176.239.222:11642", "J78BiZ:yNexnB"], ["81.176.239.222:11641", "J78BiZ:yNexnB"], ["81.176.239.222:11640", "J78BiZ:yNexnB"], ["81.176.239.222:11639", "J78BiZ:yNexnB"], ["81.176.239.222:11638", "J78BiZ:yNexnB"], ["81.176.239.222:11637", "J78BiZ:yNexnB"], ["81.176.239.222:11636", "J78BiZ:yNexnB"], ["81.176.239.222:11635", "J78BiZ:yNexnB"], ["81.176.239.222:11634", "J78BiZ:yNexnB"], ["81.176.239.222:11633", "J78BiZ:yNexnB"], ["81.176.239.222:11632", "J78BiZ:yNexnB"], ["81.177.180.144:11514", "J78BiZ:yNexnB"], ["81.177.180.144:11513", "J78BiZ:yNexnB"], ["81.177.180.144:11512", "J78BiZ:yNexnB"], ["81.177.180.144:11511", "J78BiZ:yNexnB"], ["81.177.180.144:11510", "J78BiZ:yNexnB"], ["81.177.180.144:11509", "J78BiZ:yNexnB"], ["81.177.180.144:11508", "J78BiZ:yNexnB"], ["81.177.180.144:11507", "J78BiZ:yNexnB"], ["81.177.180.144:11506", "J78BiZ:yNexnB"], ["81.177.180.144:11505", "J78BiZ:yNexnB"], ["81.177.180.144:11504", "J78BiZ:yNexnB"], ["81.177.180.144:11503", "J78BiZ:yNexnB"]];

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('Proxy', {
        auth: STRING,
        host: STRING
    }, {
        classMethods: {
            associate: function associate(_ref2) {
                /*setTimeout(()=>{
                    Promise.all(proxies.map(item=>(
                        Proxy.findOrCreate({
                            where: {
                                host: item[0]
                            },
                            defaults: {
                                auth: item[1]
                            }
                        })
                    ))).then(()=>{
                        console.log('Proxies sync success');
                    });
                }, 3000);*/

                var Proxy = _ref2.Proxy;
            }
        }
    });
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Types = __webpack_require__(53);

var _values = __webpack_require__(61);

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedTypes = ['follow', 'unfollow', 'like_followers'];

var Status = {
    PASSIVE: '0',
    ACTIVE: '1',
    FINISHED: '2'
};

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING,
        ENUM = _ref.ENUM;
    return sequelize.define('Task', {
        type: {
            type: ENUM(allowedTypes),
            allowNull: false
        },
        source: (0, _Types.SETTINGS)('source', function () {
            return [];
        }),
        status: {
            type: ENUM((0, _values2.default)(Status)),
            defaultValue: Status.PASSIVE,
            allowNull: false
        },
        settings: (0, _Types.SETTINGS)(),
        session: (0, _Types.SETTINGS)('session')
    }, {
        classMethods: {
            associate: function associate() {}
        },
        instanceMethods: {
            stop: function stop() {
                return this.update({
                    session: {},
                    status: Status.PASSIVE
                });
            },
            pause: function pause() {
                return this.update({
                    status: Status.PASSIVE
                });
            },
            continue: function _continue() {
                return this.update({
                    status: Status.ACTIVE
                });
            },

            updateSettings: (0, _Types.SETTINGS_UPDATE)(),
            updateSession: (0, _Types.SETTINGS_UPDATE)('session')
        },
        getterMethods: {
            isActive: function isActive() {
                return this.status === Status.ACTIVE;
            }
        }
    });
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptNodejs = __webpack_require__(60);

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _Types = __webpack_require__(53);

var _lodash = __webpack_require__(1);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('User', {
        email: {
            type: STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1, 255]
            }
        },
        username: {
            type: STRING(255),
            allowNull: true,
            unique: true
        },
        password: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            },
            scopes: false,
            set: function set(value) {
                this.setDataValue('password', _bcryptNodejs2.default.hashSync(value, _bcryptNodejs2.default.genSaltSync(8), null));
            }
        },
        firstName: STRING(255),
        lastName: STRING(255),
        emailVerification: {
            allowNull: true,
            type: STRING
        },
        status: {
            type: STRING(2),
            allowNull: true,
            defaultValue: '1'
        },
        settings: (0, _Types.SETTINGS)()
    }, {
        classMethods: {
            associate: function associate(_ref2) {
                var User = _ref2.User,
                    Account = _ref2.Account,
                    License = _ref2.License;

                User.hasMany(Account, {
                    as: 'accounts',
                    foreignKeyConstraint: true
                });
                User.hasOne(License, {
                    as: 'license',
                    foreignKeyConstraint: true
                });
                Account.belongsTo(User);
                License.belongsTo(User);
            }
        },
        instanceMethods: {
            verifyPassword: function verifyPassword(password) {
                return _bcryptNodejs2.default.compareSync(password, this.password);
            },
            isEmailVerified: function isEmailVerified() {
                return !this.emailVerification || this.emailVerification === 'success';
            },
            isAdmin: function isAdmin() {
                return +this.status > 7;
            },
            toJSON: function toJSON() {
                return _lodash2.default.omit(this.get(), ['password', 'emailVerification']);
            }
        },
        getterMethods: {
            fullName: function fullName() {
                return (this.firstName + ' ' + this.lastName).trim();
            }
        }
    });
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = exports.User = exports.Proxy = exports.License = exports.Account = undefined;

var _Account = __webpack_require__(54);

var _Account2 = _interopRequireDefault(_Account);

var _License = __webpack_require__(55);

var _License2 = _interopRequireDefault(_License);

var _Proxy = __webpack_require__(56);

var _Proxy2 = _interopRequireDefault(_Proxy);

var _User = __webpack_require__(58);

var _User2 = _interopRequireDefault(_User);

var _Task = __webpack_require__(57);

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Account = _Account2.default;
exports.License = _License2.default;
exports.Proxy = _Proxy2.default;
exports.User = _User2.default;
exports.Task = _Task2.default;

/***/ },
/* 60 */
/***/ function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ },
/* 61 */
/***/ function(module, exports) {

module.exports = require("lodash/values");

/***/ }
/******/ ]);