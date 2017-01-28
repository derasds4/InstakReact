'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _instagramPrivateApi = require('instagram-private-api');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

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
var Instagram = (_temp = _class = function () {
    function Instagram(account) {
        var initSession = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        _classCallCheck(this, Instagram);

        this._account = account;
        this._device = new Device(account.username);
        this._storage = new CookieFileStorage(getFile(account.username));
        if (initSession) {
            this._session = new Session(this._device, this._session);
        }
    }

    _createClass(Instagram, [{
        key: 'login',
        value: function login(password) {
            return Session.create(this._device, this._storage, this.account.username, password, Instagram.getProxyURL(this.account.proxy));
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
            return 'https://' + proxy.auth + '@' + proxy.host;
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