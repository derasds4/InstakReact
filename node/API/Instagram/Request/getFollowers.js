'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _Actions = require('../Actions');

var _Constants = require('../Constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Request2.default({
    path: function path(session, _ref) {
        var userId = _ref.userId;
        return 'friendships/' + userId + '/followers';
    },
    method: _Constants.Method.GET,
    use: [_Actions.maxId, _Actions.rankToken, _Actions.friendshipList]
});