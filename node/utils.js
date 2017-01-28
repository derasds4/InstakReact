'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isLocalhost = isLocalhost;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ifaces = _os2.default.networkInterfaces();
var ips = ['127.0.0.1'];
var hashSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function isLocalhost() {
    return ifaces.en0 && (ips.indexOf(ifaces.en0[0].address) > -1 || ips.indexOf(ifaces.en0[1].address) > -1) || ifaces.eth0 && (ips.indexOf(ifaces.eth0[0].address) > -1 || ips.indexOf(ifaces.eth0[1].address) > -1) || ifaces.lo0 && (ips.indexOf(ifaces.lo0[0].address) > -1 || ips.indexOf(ifaces.lo0[1].address) > -1);
}