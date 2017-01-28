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
    path: 'qe/sync/',
    method: _Constants.Method.POST,
    execute: function execute(_ref, force) {
        var instagram = _ref.instagram;
        return {
            params: force ? {
                experiments: _Constants.LOGIN_EXPERIMENTS,
                id: (0, _nodeUuid.v4)()
            } : {
                _uuid: instagram.session.uuid,
                _uid: instagram.profile.pk,
                _csrftoken: instagram.session.csrfToken,
                id: instagram.profile.pk,
                experiments: _Constants.EXPERIMENTS
            }
        };
    }
});