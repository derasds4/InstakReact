'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.association = exports.verify = exports.remove = exports.helpers = exports.get = exports.create = undefined;

var _Models = require('../../Models');

var _Instagram = require('../../API/Instagram');

var _Instagram2 = _interopRequireDefault(_Instagram);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var create = exports.create = function create() {
    return _Models.User.create({
        username: 'derasds4',
        email: 'derasds4@gmail.com',
        status: '10',
        password: 'mysuperpupermegaoverpassword'
    }).then(function (user) {
        return user.get();
    });
};

var get = exports.get = function get() {
    return _Models.User.findAll();
};

var helpers = exports.helpers = function helpers() {
    return _Models.User.findAll().then(function (users) {
        (0, _each2.default)(users, function (user) {
            for (var index in user) {
                console.log(index);
            }
        });
        return users;
    });
};

var remove = exports.remove = function remove() {
    return _Models.User.findOne().then(function (user) {
        return user.destroy();
    });
};

var verify = exports.verify = function verify() {
    return _Models.User.findOne().then(function (user) {
        return user.verifyPassword('NotMysuperpupermegaoverpassword');
    });
};

var association = exports.association = function association() {
    return _bluebird2.default.all([_Models.Account.create({
        username: 'test'
    }), _Models.Proxy.create({
        auth: 'sdf',
        host: 'dfg'
    }), _Models.User.findOrCreate({
        where: {
            username: 'sfgy'
        },
        defaults: {
            email: 'kasa@mail.com',
            password: 'sdfsdf'
        }
    }), _Models.Task.create({
        type: 'follow'
    })]).spread(function (account, proxy, user, task) {
        return _lodash2.default.mapValues({
            account: {
                instance: account,
                getUser: account.getUser,
                setUser: account.setUser,
                getProxy: account.getProxy,
                setProxy: account.setProxy,
                getTasks: account.getTasks,
                addTask: account.addTask,
                setTasks: account.setTasks,
                addTasks: account.addTasks
            },
            proxy: {
                instance: proxy,
                AccountId: task.AccountId,
                accountId: task.accountId,
                getAccount: proxy.getAccount,
                setAccount: proxy.setAccount
            },
            user: {
                instance: user[0],
                getAccounts: user[0].getAccounts,
                addAccount: user[0].addAccount,
                addAccounts: user[0].addAccounts,
                setAccounts: user[0].setAccounts
            },
            task: {
                instance: task,
                AccountId: task.AccountId,
                accountId: task.accountId,
                getAccount: task.getAccount,
                setAccount: task.setAccount
            }
        }, function (model, key) {
            var result = model.instance.get();
            _lodash2.default.each(model, function (value, name) {
                if (name !== 'instance') {
                    result[name] = value && value.toString() || (value !== undefined ? '' + value : 'NO') || 'null';
                }
            });
            return result;
        });
    });
};