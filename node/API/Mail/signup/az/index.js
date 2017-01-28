'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Mail = require('../../Mail');

var _Mail2 = _interopRequireDefault(_Mail);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _Mail2.default({
    subject: '(AZ)Регистрация завершена',
    template: _path2.default.join(__dirname, 'index.ejs')
});