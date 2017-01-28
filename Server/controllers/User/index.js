import {User} from '../../Models'
import {getAccounts} from '../License'
import * as associations from './associations'
import {USER_ACCOUNT_LIMIT} from '../errors'

export {associations}

export const getAccountsCount = user=> Promise.all([
    associations.verifyLicense(user),
    associations.getAccounts(user)
]).then(()=> getAccounts(user.license) - user.accounts.length);

export const verifyAccountsCount = user=> getAccountsCount(user)
    .then(count=>{
        console.log('accounts count', count);
        if(count === 0){
            throw USER_ACCOUNT_LIMIT
        }
        return count;
    });