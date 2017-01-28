'use strict';

var _Application = require('../Application');

var _user = require('./user');

var user = _interopRequireWildcard(_user);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

Error.stackTraceLimit = Infinity;

var testRoute = _express2.default.Router();
(0, _each2.default)({ user: user }, function (values, key) {
    var partRouter = _express2.default.Router();
    (0, _each2.default)(values, function (callback, name) {
        partRouter.use('/' + name, function RouterCallback(req, res, next) {
            callback(req, res, next).then(function (response) {
                res.json({
                    component: key,
                    name: name,
                    response: response
                });
            }).catch(function (error) {
                console.error(error);
                res.json({
                    component: key,
                    name: name,
                    error: error
                });
            });
        });
    });
    testRoute.use('/' + key, partRouter);
});
_Application.Application.use('/test', testRoute);