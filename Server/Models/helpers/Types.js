import Sequelize from 'sequelize'
import _ from 'lodash'
/**
 * @param {String} name
 * @param defaultValue
 * @constructor
 */
export const SETTINGS = (name = 'settings', defaultValue = ()=>({}))=>({
    type:Sequelize.TEXT('long'),
    set(value){
        var json;
        try{
            json = JSON.stringify(value);
        }catch(e){
            json = this.getDataValue(name) || JSON.stringify(defaultValue());
        }
        this.setDataValue(name, json);
    },
    get(){
        try{
            return JSON.parse(''+this.getDataValue(name));
        }catch(e){
            return defaultValue();
        }
    }
});

export const SETTINGS_UPDATE = (name = 'settings')=> (
    function updateSettings(value = {}) {
        return this.update({
            [name]: _.merge(this.getDataValue(name), value)
        });
    }
);