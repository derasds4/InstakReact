'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _Constants = require('../Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Request2.default({
    path: 'accounts/login',
    method: _Constants.Method.POST,
    static: {
        useInstagramCookies: true
    },
    execute: function execute(_ref, _ref2) {
        var instagram = _ref.instagram;
        var username = _ref2.username,
            password = _ref2.password;
        return {
            params: {
                username: username,
                password: password,
                guid: instagram.session.guid,
                phone_id: instagram.session.phoneId,
                device_id: instagram.session.deviceId,
                _csrftoken: instagram.session.csrfToken
            }
        };
    }
});