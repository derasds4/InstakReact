'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.default = undefined;

var _Mail = require('./Mail');

var _Mail2 = _interopRequireDefault(_Mail);

var _signup2 = require('./signup');

var _signup = _interopRequireWildcard(_signup2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Mail2.default;
exports.signup = _signup;