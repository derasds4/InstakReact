'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Constants = require('../Constants');

var _Session = require('../Session');

var _Session2 = _interopRequireDefault(_Session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = (_temp = _class = function () {
    function Request() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Request);

        this.options = _lodash2.default.defaults(options, Request.options);
        if (this.options.use) {
            this.options.use = [].concat(_toConsumableArray(this.options.use), [this.options.execute]);
            this.options.execute = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _lodash2.default.merge({}, _lodash2.default.map(_this.options.use, function (plugin) {
                    return plugin.apply(undefined, args);
                }));
            };
        }
        if (!_lodash2.default.isFunction(this.options.path)) {
            var path = this.options.path;
            this.options.path = function () {
                return path;
            };
        }
        var execute = this.options.execute;
        this.options.execute = function () {
            return _lodash2.default.merge({}, _this.options.static, execute.apply(undefined, arguments));
        };
    }

    /**
     * @param {Instagram} instagram
     * @param options
     * @return {Promise.<TResult>|*}
     */


    _createClass(Request, [{
        key: 'execute',
        value: function execute(instagram, options) {
            var _this2 = this;

            return new _Session2.default(instagram, this, options).execute().then(function (result) {
                if (!_this2.options.setResponseCookies) {
                    return result;
                }
                return instagram.saveSession({
                    cookies: result.cookies
                }).then(function () {
                    return result;
                });
            });
        }
    }]);

    return Request;
}(), _class.options = {
    path: null,
    method: _Constants.Method.GET,
    static: {},
    execute: function execute() {
        return {};
    },
    use: null,
    version: 1,
    setResponseCookies: false
}, _temp);
exports.default = Request;