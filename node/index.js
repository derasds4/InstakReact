'use strict';

var _Application = require('./Application');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Models = require('./Models');

var _utils = require('./utils');

require('./Router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Application.Application.use(function (req, res, next) {
    res.sendfile(_path2.default.join(__dirname, '../public/index.html'));
});

console.log('Server ready');

_Models.sequelize.sync({ force: true }).then(function () {
    console.log('Sync success');
    (0, _Application.listen)(8080).then(function () {
        console.log("Server listen");
    });
}).catch(function () {
    if ((0, _utils.isLocalhost)()) {
        (0, _Application.listen)(8080).then(function () {
            console.log("Server listen ( localhost only )");
        });
    }
});