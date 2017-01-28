'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csr = exports.cert = exports.key = undefined;

var _utils = require('../utils');

var _instak = require('./instak.me');

var instakMe = _interopRequireWildcard(_instak);

var _localhost = require('./localhost');

var localhost = _interopRequireWildcard(_localhost);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var SSL = (0, _utils.isLocalhost)() ? localhost : instakMe;

var key = exports.key = SSL.key;
var cert = exports.cert = SSL.cert;
var csr = exports.csr = SSL.crt;