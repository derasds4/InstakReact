'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _nodeUuid = require('node-uuid');

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _Request = require('./Request');

var _fs = require('fs');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Constants = require('./Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEVICES = _lodash2.default.map((0, _fs.readFileSync)(_path2.default.join(__dirname, 'devices.csv'), 'utf8').toString().split("\n"), function (item) {
    return item.trim().split(';');
});
var INIT_TIME = Math.ceil(Date.now() / 1000);
var defaultSession = {
    account: null,
    guid: null,
    uuid: null,
    proxy: null,
    cookies: null,
    phoneId: null,
    deviceId: null,
    csrfToken: null,
    googleAdId: null
};

var Instagram = function () {
    function Instagram(account) {
        _classCallCheck(this, Instagram);

        this._account = account;
        this.initSession();
    }

    _createClass(Instagram, [{
        key: 'initSession',
        value: function initSession() {
            this._session = (0, _assign2.default)({}, defaultSession, this.account.session);
            return this;
        }
    }, {
        key: 'saveSession',
        value: function saveSession(data) {
            var _this = this;

            this.setSession(data);
            return this._account.update({
                session: JSON.stringify(this.session)
            }).then(function () {
                return _this;
            });
        }
    }, {
        key: 'setSession',
        value: function setSession(data) {
            (0, _assign2.default)(this._session, data);
            return this;
        }
    }, {
        key: 'login',
        value: function login(username, password) {
            var _this2 = this;

            var idv4 = (0, _nodeUuid.v4)();
            var device = _lodash2.default.sample(DEVICES);
            this.setSession({
                uuid: idv4,
                guid: idv4,
                phoneId: (0, _nodeUuid.v4)(),
                rankToken: (0, _nodeUuid.v4)(),
                googleAdId: (0, _nodeUuid.v4)(),
                deviceId: 'android-' + (0, _md2.default)((0, _md2.default)(username + password) + INIT_TIME).substr(16),
                UserAgent: 'Instagram ' + _Constants.VERSION + ' Android (18/4.3; 320dpi; 720x1280; ' + device[0] + '; ' + device[1] + '; ' + device[2] + '; qcom; en_US'
            });
            return _Request.syncFeatures.execute(this, true).catch(function () {}).then(function () {
                return _Request.fetchHeaders.execute(_this2);
            }).then(function (_ref) {
                var cookies = _ref.cookies;

                _this2.setSession({
                    csrfToken: cookies.csrftoken,
                    cookies: cookies
                });
                console.log('AFTER FETCH', cookies.csrftoken);
                return _Request.login.execute(_this2, { username: username, password: password });
            }).then(function (response) {
                return _this2.saveSession({
                    account: response.logged_in_user
                }).then(function () {
                    return response;
                });
            });
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
    }, {
        key: 'profile',
        get: function get() {
            return this._session.account;
        }
    }, {
        key: 'cookies',
        get: function get() {
            return this.session.cookies || (this.session.cookies = {});
        },
        set: function set(value) {
            this.session.cookies = (0, _isObject2.default)(value) ? value : {};
            if (this.session.cookies.csrftoken) {
                this.session.csrfToken = this.session.cookies.csrftoken;
            }
        }
    }, {
        key: 'rankToken',
        get: function get() {
            if (!this.profile) {
                return this.session.rankToken;
            }
            return this.profile.pk + '_' + this.session.rankToken;
        }
    }], [{
        key: 'get',
        value: function get(account) {
            return account.getProxy().then(function (proxy) {
                account.proxy = proxy;
                return new Instagram(account);
            });
        }
    }]);

    return Instagram;
}();

exports.default = Instagram;