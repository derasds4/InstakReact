'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _Types = require('./helpers/Types');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, _ref) {
    var STRING = _ref.STRING;
    return sequelize.define('User', {
        email: {
            type: STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1, 255]
            }
        },
        username: {
            type: STRING(255),
            allowNull: true,
            unique: true
        },
        password: {
            type: STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            },
            scopes: false,
            set: function set(value) {
                this.setDataValue('password', _bcryptNodejs2.default.hashSync(value, _bcryptNodejs2.default.genSaltSync(8), null));
            }
        },
        firstName: STRING(255),
        lastName: STRING(255),
        emailVerification: {
            allowNull: true,
            type: STRING
        },
        status: {
            type: STRING(2),
            allowNull: true,
            defaultValue: '1'
        },
        settings: (0, _Types.SETTINGS)()
    }, {
        classMethods: {
            associate: function associate(_ref2) {
                var User = _ref2.User,
                    Account = _ref2.Account,
                    License = _ref2.License;

                User.hasMany(Account, {
                    as: 'accounts',
                    foreignKeyConstraint: true
                });
                User.hasOne(License, {
                    as: 'license',
                    foreignKeyConstraint: true
                });
                Account.belongsTo(User);
                License.belongsTo(User);
            }
        },
        instanceMethods: {
            verifyPassword: function verifyPassword(password) {
                return _bcryptNodejs2.default.compareSync(password, this.password);
            },
            isEmailVerified: function isEmailVerified() {
                return !this.emailVerification || this.emailVerification === 'success';
            },
            isAdmin: function isAdmin() {
                return +this.status > 7;
            },
            toJSON: function toJSON() {
                return _lodash2.default.omit(this.get(), ['password', 'emailVerification']);
            }
        },
        getterMethods: {
            fullName: function fullName() {
                return (this.firstName + ' ' + this.lastName).trim();
            }
        }
    });
};