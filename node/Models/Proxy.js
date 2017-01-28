'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('Proxy', {
        auth: STRING,
        host: STRING
    }, {
        classMethods: {
            associate: function associate() {}
        }
    });
};