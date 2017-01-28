'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.login = login;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = require('instagram-private-api').V1;


function createFile(filename) {
    return new Promise(function (resolve, reject) {
        _fsExtra2.default.open(filename, 'r', function (err, fd) {
            if (err) {
                _fsExtra2.default.writeFile(filename, '', function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}

function login(username, password) {
    var file = _path2.default.join(__dirname, 'cookies/' + username + '.json');
    _fsExtra2.default.createFileSync(file);
    var device = new Client.Device(username);
    var storage = new Client.CookieFileStorage(file);
    return Client.Session.create(device, storage, username, password).then(function (session) {
        return [session, Client.Account.searchForUser(session, 'instagram')];
    }).spread(function (session, account) {
        return session.getAccount().then(function (_ref) {
            var params = _ref.params;

            return { params: params, account: account };
        });
    });
}