'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Application = (0, _express2.default)();

Application.set('views', _path2.default.join(__dirname, 'View'));
Application.set('view engine', 'ejs');
Application.set('view cache', true);
Object.assign(Application.locals, {
    files: {
        js: [],
        css: []
    },
    version: 1,
    title: 'Untitle page'
});

Application.use((0, _compression2.default)());
Application.use(_express2.default.static(_path2.default.join(__dirname, '../../../public'), { maxAge: 604800000 }));

exports.default = Application;