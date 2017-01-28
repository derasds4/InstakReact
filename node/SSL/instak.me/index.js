'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cert = exports.key = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = exports.key = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/instak.me/server.key'), 'utf8');
var cert = exports.cert = _fs2.default.readFileSync(_path2.default.join(__dirname, '../../../Server/SSL/instak.me/server.crt'), 'utf8');