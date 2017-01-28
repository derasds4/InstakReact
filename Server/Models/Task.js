import {SETTINGS, SETTINGS_UPDATE} from './helpers/Types'
import values from 'lodash/values'

const allowedTypes = [
    'follow',
    'unfollow',
    'like_followers'
];

const Status = {
    PASSIVE: '0',
    ACTIVE: '1',
    FINISHED: '2'
};

export default (sequelize, {STRING, ENUM})=> (
    sequelize.define('Task', {
        type:{
            type: ENUM(allowedTypes),
            allowNull: false
        },
        source: SETTINGS('source', ()=>[]),
        status: {
            type: ENUM(values(Status)),
            defaultValue: Status.PASSIVE,
            allowNull: false
        },
        settings: SETTINGS(),
        session: SETTINGS('session')
    }, {
        classMethods:{
            associate(){

            }
        },
        instanceMethods: {
            stop(){
                return this.update({
                    session: {},
                    status: Status.PASSIVE
                });
            },
            pause(){
                return this.update({
                    status: Status.PASSIVE
                });
            },
            continue(){
                return this.update({
                    status: Status.ACTIVE
                });
            },
            updateSettings: SETTINGS_UPDATE(),
            updateSession: SETTINGS_UPDATE('session')
        },
        getterMethods: {
            isActive() {
                return this.status === Status.ACTIVE
            }
        }
    })
)