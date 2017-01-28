'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _Constants = require('../Constants');

var _nodeUuid = require('node-uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Request2.default({
    path: 'si/fetch_headers',
    method: _Constants.Method.GET,
    execute: function execute() {
        return {
            params: {
                challenge_type: 'signup',
                guid: (0, _nodeUuid.v4)().replace('-', '')
            }
        };
    }
});