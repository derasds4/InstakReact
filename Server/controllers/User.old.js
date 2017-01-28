import {User} from '../Models'
import * as License from './License'

Error.stackTraceLimit = Infinity;

export const getLicense = user=> {
    if(user.license !== undefined){
        return Promise.resolve(user);
    }
    return user.getLicense().then(license=>{
        user.license = license;
        return user;
    })
};

export const getAccounts = user=> {
    if(user.accounts !== undefined){
        return Promise.resolve(user);
    }
    console.log(user);
    return user.getAccounts().then(accounts=> {
        user.accounts = accounts;
        return user;
    });
};

export const getFromRequest = req=> {
    if(req.user){
        return Promise.resolve(req.user);
    }
    return User.findOne({
        where: req.loggedIn
    }).then(user=> {
        if (!user) {
            throw new Error('auth.token.bad');
        }
        req.user = user;
        return user;
    })
};

export const verifyLicense = user=>(
    getLicense(user)
        .then(license=> {
            if(!license.isActive){
                throw new Error('user.badLicense');
            }
            return license;
        })
);

export const getAvailableAccountsCount = user=> Promise.all([
    verifyLicense(user),
    getAccounts(user)
]).then(()=> License.getAccounts(user.license) - user.accounts.length);

export const verifyAvailableAccountsCount = user=>(
    getAvailableAccountsCount(user)
        .then(count=>{
            if(count === 0){
                throw new Error('user.accountsLimit');
            }
            return count;
        })
);