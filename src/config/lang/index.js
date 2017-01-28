import * as ru from './ru'
import * as en from './en'
import * as az from './az'
import each from 'lodash/each'

each({en, ru, az}, (value, key)=>{
    counterpart.registerTranslations(key, value);
});

export {en, ru, az}