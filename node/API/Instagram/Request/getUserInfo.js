'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _Constants = require('../Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Request2.default({
    path: function path(session, _ref) {
        var userId = _ref.userId;
        return 'users/' + userId + '/info';
    },
    method: _Constants.Method.POST
});