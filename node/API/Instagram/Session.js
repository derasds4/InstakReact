'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _Constants = require('./Constants');

var Constants = _interopRequireWildcard(_Constants);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _nodeLibcurl = require('node-libcurl');

var _querystring = require('querystring');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = (_temp = _class = function () {
    function Session(instagram, request, options) {
        _classCallCheck(this, Session);

        this.instagram = instagram;
        this.request = request;
        this.curl = new _nodeLibcurl.Curl();
        this.options = _lodash2.default.merge({}, Session.options, request.options.execute(this, options));
        this.options.headers['User-Agent'] = instagram.session.UserAgent;
        if (this.options.signedBody) {
            _lodash2.default.assign(this.options.params, Session.getSignedBody(this.options.signedBody));
        }
        if (this.options.useInstagramCookies) {
            _lodash2.default.assign(this.options.cookies, instagram.cookies);
        }
        this.state = {
            CURL_OPTIONS: {},
            COOKIES: this.options.cookies || {},
            HEADERS: this.options.headers || {},
            SIGNED_BODY: this.options.signedBody || null,
            PARAMS: this.options.params
        };
        this.setOpt({
            SSL_VERIFYPEER: true,
            COOKIE: Session.cookiesToString(this.options.cookies),
            HTTPHEADER: Session.headersToString(this.options.headers),
            PROXY: 'https://' + instagram.account.proxy.host,
            PROXYUSERPWD: instagram.account.proxy.auth,
            FOLLOWLOCATION: true,
            HEADER: false,
            VERBOSE: false,
            USERAGENT: this.options.headers['User-Agent']
        });
        switch (this.request.options.method) {
            case Constants.Method.GET:
                this.initMethodGET();
                break;
            case Constants.Method.POST:
                this.initMethodPOST();
                break;
        }
        this.state.URL = this.url;
        this.state.METHOD = this.request.options.method;
    }

    _createClass(Session, [{
        key: 'destroy',
        value: function destroy() {
            this.instagram = null;
            this.request = null;
            this.curl = null;
            this.options = null;
        }
    }, {
        key: 'setOpt',
        value: function setOpt(key, value) {
            var _this = this;

            if (_lodash2.default.isObject(key)) {
                _lodash2.default.each(key, function (value, key) {
                    return _this.setOpt(key, value);
                });
                return this;
            }
            this.state.CURL_OPTIONS[key] = value;
            this.curl.setOpt(key, value);
        }
    }, {
        key: 'initMethodPOST',
        value: function initMethodPOST() {
            this.setOpt({
                URL: this.url,
                POST: true,
                POSTFIELDS: (0, _querystring.stringify)(this.options.params)
            });
        }
    }, {
        key: 'initMethodGET',
        value: function initMethodGET() {
            this.setOpt({
                URL: this.url + '?' + (0, _querystring.stringify)(this.options.params),
                CUSTOMREQUEST: 'GET',
                HTTPGET: true
            });
        }
    }, {
        key: 'execute',
        value: function execute() {
            var _this2 = this;

            console.log('SESSION START');
            console.log(this.state);
            return new _bluebird2.default(function (resolve, reject) {
                _this2.curl.on('error', reject);
                _this2.curl.on('end', function (status, body, headers) {
                    console.log('SESSION END', status);
                    console.log('SESSION HEADERS');
                    console.log(headers);
                    console.log('SESSION BODY');
                    console.log(body);
                    if (Constants.StatusSuccess.indexOf(status) === -1) {
                        reject(new Error(body));
                    }
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        reject(new Error('InvalidBody'));
                    }
                    headers = headers[headers.length - 1];
                    resolve({
                        status: status,
                        body: body,
                        headers: headers,
                        cookies: Session.getCookies(headers)
                    });
                });
                _this2.curl.perform();
            }).finally(function () {
                return _this2.destroy.bind(_this2);
            });
        }
    }, {
        key: 'url',
        get: function get() {
            return Constants.BASE_URL + '/v' + this.request.options.version + '/' + this.request.options.path(this);
        }
    }], [{
        key: 'getSignedBody',
        value: function getSignedBody(params) {
            params = JSON.stringify(params);
            return {
                signed_body: _cryptoJs2.default.HmacSHA256(params, Constants.IG_SIGNATURE_KEY) + '.' + params,
                ig_sig_key_version: Constants.IG_SIGNATURE_KEY_VERSION
            };
        }
    }, {
        key: 'getCookies',
        value: function getCookies(headers) {
            headers = headers['Set-Cookie'];
            if (!headers) {
                return {};
            }
            var cookies = {};
            _lodash2.default.each(headers, function (value) {
                value = value.split(';')[0].trim().split('=');
                cookies[value[0]] = value[1];
            });
            return cookies;
        }
    }, {
        key: 'cookieToString',
        value: function cookieToString(value, key) {
            return key + '=' + value;
        }
    }, {
        key: 'cookiesToString',
        value: function cookiesToString(cookies) {
            return _lodash2.default.map(cookies, Session.cookieToString).join(';');
        }
    }, {
        key: 'headerToString',
        value: function headerToString(value, key) {
            return key + ': ' + value;
        }
    }, {
        key: 'headersToString',
        value: function headersToString(headers) {
            return _lodash2.default.map(headers, Session.headerToString);
        }
    }]);

    return Session;
}(), _class.options = {
    signedBody: null,
    cookies: {},
    params: {},
    headers: {
        'Connection': 'close',
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        "Accept-Language": Constants.ACCEPT_LANGUAGE,
        "X-IG-Capabilities": Constants.IG_CAPABILITIES,
        "X-IG-Connection-Type": Constants.IG_CONNECTION_TYPE
    },
    useInstagramCookies: true
}, _temp);
exports.default = Session;