'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _sendpulse = require('./sendpulse');

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ID = '81d9d2878ebf93bc7aa721fc9d1dcef6';
var SECRET = 'c3459e5e78cd324c5ba3c9a51c1cf164';
var TOKEN_STORAGE = "/tmp/";

(0, _sendpulse.init)(ID, SECRET, TOKEN_STORAGE);

var Mail = (_temp = _class = function () {
    function Mail() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Mail);

        this.options = (0, _defaults2.default)(options, Mail.options);
    }

    _createClass(Mail, [{
        key: 'send',
        value: function send() {
            var _this = this;

            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return new Promise(function (resolve) {
                var email = {
                    from: _this.options.from,
                    to: [options.to],
                    subject: _this.options.subject
                };
                if (_this.options.template) {
                    _ejs2.default.renderFile(_this.options.template, options.data, {
                        cache: false
                    }, function (error, html) {
                        if (error) {
                            throw error;
                        }
                        email.html = html;
                        (0, _sendpulse.smtpSendMail)(resolve, email);
                    });
                }
            });
        }
    }], [{
        key: 'addEmails',
        value: function addEmails(id, emails) {
            if (!(0, _isObject2.default)(emails) && !(0, _isArray2.default)(emails)) {
                emails = {
                    email: emails,
                    variables: {}
                };
            }
            if (!(0, _isArray2.default)(emails)) {
                emails = [emails];
            }
            return new Promise(function (resolve) {
                (0, _sendpulse.addEmails)(resolve, id, emails);
            });
        }
    }]);

    return Mail;
}(), _class.options = {
    text: null,
    html: null,
    template: null,
    from: {
        name: 'Instak',
        email: 'noreply@instak.me'
    },
    subject: 'Notification'
}, _temp);
exports.default = Mail;