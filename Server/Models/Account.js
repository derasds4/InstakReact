import {SETTINGS, SETTINGS_UPDATE} from './helpers/Types'

export default (sequelize, {STRING})=> (
    sequelize.define('Account', {
        username:{
            type: STRING(255),
            allowNull: false,
            unique: true
        },
        settings: SETTINGS()
    }, {
        classMethods:{
            associate({Proxy, Task, Account}){
                Account.hasMany(Task, {
                    as: 'tasks',
                    foreignKeyConstraint: true
                });
                Account.hasOne(Proxy, {
                    as: 'proxy',
                    foreignKeyConstraint: true
                });
                Task.belongsTo(Account);
                Proxy.belongsTo(Account);
            }
        },
        instanceMethods: {
            updateSettings: SETTINGS_UPDATE()
        }
    })
)