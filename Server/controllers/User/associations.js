import {User, License, Account} from '../../Models'
import {AUTH_TOKEN_BAD, USER_LICENSE_BAD} from '../errors'

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
    return user.getAccounts().then(accounts=> {
        user.accounts = accounts;
        return user;
    });
};

export const verifyLicense = user=> getLicense(user)
    .then(({license})=> {
        if (!license || !license.isActive) {
            throw USER_LICENSE_BAD
        }
        return user;
    });

export const getFromRequest = req=> {
    if(req.user){
        return Promise.resolve(req.user);
    }
    return User.findOne({
        where: req.loggedIn
    }).then(user=> {
        if (!user) {
            throw AUTH_TOKEN_BAD
        }
        return Promise.all([
            user.getLicense(),
            user.getAccounts()
        ]).then(([license, accounts])=> {
            user.license = license;
            user.accounts = accounts;
            req.user = user;
            return user;
        });
    })
};