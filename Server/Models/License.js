import _ from 'lodash'
import {Types, Status} from './helpers/License'

const typeKeys = _.keys(Types);

export default (sequelize, {STRING, ENUM, INTEGER, DATE})=> (
    sequelize.define('License', {
        type: {
            type: ENUM(...typeKeys),
            defaultValue: typeKeys[0],
            allowNull: false
        },
        startedAt: DATE,
        months: INTEGER,
        status: {
            type: ENUM(_.values(Status)),
            defaultValue: Status.PASSIVE,
            allowNull: true
        }
    }, {
        getterMethods: {
            expiresIn(){
                var date = new Date(this.startedAt);
                date.setMonth(date.getMonth() + this.months);
                return date;
            },
            isActive(){
                return this.status === Status.ACTIVE && this.expiresIn.getTime() > Date.now();
            }
        },
        instanceMethods: {
            activate(){
                if(this.status === Status.ACTIVE){
                    throw new Error('License.StatusAlreadyActive');
                }
                return this.update({
                    status: Status.ACTIVE,
                    startedAt: new Date()
                })
            }
        }
    })
)