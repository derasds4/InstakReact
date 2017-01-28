import {License} from '../Models'
import {Types} from '../Models/helpers/License'

export const getAccounts = license=>{
    if(!license){
        return 0
    }
    if(!license.isActive){
        return 0;
    }
    return Types[license.type].accounts || 0;
};