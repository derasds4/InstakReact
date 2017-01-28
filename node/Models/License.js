'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allowTypes = ['start', 'standart', 'premium'];
var Status = {
    PASSIVE: '0',
    ACTIVE: '1',
    ABORTED: '2'
};

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING,
        ENUM = _ref.ENUM,
        INTEGER = _ref.INTEGER,
        DATE = _ref.DATE;
    return sequelize.define('License', {
        type: {
            type: ENUM(allowTypes),
            defaultValue: allowTypes[0],
            allowNull: false
        },
        accounts: INTEGER,
        months: INTEGER,
        expiresIn: DATE,
        status: {
            type: ENUM((0, _values2.default)(Status)),
            defaultValue: Status.PASSIVE,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function associate() {}
        },
        getterMethods: {
            isActive: function isActive() {
                return this.status === Status.ACTIVE && new Date(this.expiresIn).getTime() > Date.now();
            },
            activate: function activate() {
                return this.update({
                    state: Status.ACTIVE,
                    expiresIn: new Date()
                });
            }
        }
    });
};