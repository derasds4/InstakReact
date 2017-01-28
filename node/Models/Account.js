'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Types = require('./helpers/Types');

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('Account', {
        username: {
            type: STRING(255),
            allowNull: false,
            unique: true
        },
        session: (0, _Types.SETTINGS)('session'),
        settings: (0, _Types.SETTINGS)()
    }, {
        classMethods: {
            associate: function associate(_ref2) {
                var Proxy = _ref2.Proxy,
                    Task = _ref2.Task,
                    Account = _ref2.Account;

                Account.hasMany(Task, {
                    as: 'tasks',
                    foreignKeyConstraint: true
                });
                Account.hasOne(Proxy, {
                    as: 'proxy',
                    foreignKeyConstraint: true
                });
                Task.belongsTo(Account);
                Proxy.belongsTo(Account);
            }
        }
    });
};