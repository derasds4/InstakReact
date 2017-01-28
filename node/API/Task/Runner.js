'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Instagram = require('../Instagram');

var _Instagram2 = _interopRequireDefault(_Instagram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskRunner = function () {
    function TaskRunner(task) {
        var _this = this;

        _classCallCheck(this, TaskRunner);

        this._task = task;
        return task.getAccount().then(function (account) {
            _this._account = account;
            return _Instagram2.default.get(account);
        }).then(function (instagram) {
            _this._instagram = instagram;
        }).then(function () {
            return _this.execute();
        });
    }

    _createClass(TaskRunner, [{
        key: 'execute',
        value: function execute() {}
    }, {
        key: 'task',
        get: function get() {
            return this._task;
        }
    }, {
        key: 'account',
        get: function get() {
            return this._account;
        }
    }, {
        key: 'instagram',
        get: function get() {
            return this._instagram;
        }
    }]);

    return TaskRunner;
}();

exports.default = TaskRunner;