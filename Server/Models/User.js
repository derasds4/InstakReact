import bcrypt from 'bcrypt-nodejs'
import {SETTINGS} from './helpers/Types'
import _ from 'lodash'

export default (sequelize, {STRING})=>(
    sequelize.define('User', {
        email:{
            type: STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true,
                len:[1,255]
            }
        },
        username:{
            type: STRING(255),
            allowNull: true,
            unique: true
        },
        password: {
            type: STRING,
            allowNull: false,
            validate: {
                len:[1,255]
            },
            scopes: false,
            set(value){
                this.setDataValue('password', bcrypt.hashSync(value, bcrypt.genSaltSync(8), null));
            }
        },
        firstName: STRING(255),
        lastName: STRING(255),
        emailVerification: {
            allowNull: true,
            type: STRING
        },
        status:{
            type: STRING(2),
            allowNull: true,
            defaultValue: '1'
        },
        settings: SETTINGS()
    }, {
        classMethods:{
            associate({User, Account, License}){
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
            verifyPassword(password){
                return bcrypt.compareSync(password, this.password);
            },
            isEmailVerified(){
                return !this.emailVerification || this.emailVerification === 'success';
            },
            isAdmin(){
                return +this.status > 7;
            },
            toJSON(){
                return _.omit(this.get(), ['password', 'emailVerification']);
            }
        },
        getterMethods: {
            fullName(){
                return (this.firstName + ' ' + this.lastName).trim();
            }
        }
    })
);