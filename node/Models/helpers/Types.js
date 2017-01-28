'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SETTINGS = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {String} name
 * @param defaultValue
 * @constructor
 */
var SETTINGS = exports.SETTINGS = function SETTINGS() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'settings';
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return {};
    };
    return {
        type: _sequelize2.default.TEXT('long'),
        set: function set(value) {
            var json;
            try {
                json = JSON.stringify(value);
            } catch (e) {
                json = this.getDataValue(name) || JSON.stringify(defaultValue());
            }
            this.setDataValue(name, json);
        },
        get: function get() {
            try {
                return JSON.parse('' + this.getDataValue(name));
            } catch (e) {
                return defaultValue();
            }
        }
    };
};