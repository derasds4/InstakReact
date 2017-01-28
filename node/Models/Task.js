'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Types = require('./helpers/Types');

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowedTypes = ['follow', 'unfollow', 'like_followers'];

var Status = {
    PASSIVE: '0',
    ACTIVE: '1',
    FINISHED: '2'
};

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING,
        ENUM = _ref.ENUM;
    return sequelize.define('Task', {
        type: {
            type: ENUM(allowedTypes),
            allowNull: false
        },
        source: (0, _Types.SETTINGS)('source', function () {
            return [];
        }),
        status: {
            type: ENUM((0, _values2.default)(Status)),
            defaultValue: Status.PASSIVE,
            allowNull: false
        },
        settings: (0, _Types.SETTINGS)(),
        session: (0, _Types.SETTINGS)('session')
    }, {
        classMethods: {
            associate: function associate() {}
        },
        instanceMethods: {
            stop: function stop() {
                return this.update({
                    session: {},
                    status: Status.PASSIVE
                });
            },
            pause: function pause() {
                return this.update({
                    status: Status.PASSIVE
                });
            },
            continue: function _continue() {
                return this.update({
                    status: Status.ACTIVE
                });
            }
        }
    });
};