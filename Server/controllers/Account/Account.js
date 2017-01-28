import {Account, Proxy} from '../../Models'
import {associations, verifyAccountsCount} from '../User'
import {getAvailable, verify} from '../Proxy'
import {promisify} from '../helpers'
import Instagram from '../../API/Instagram'
import {USER_ACCOUNT_REQUIRE, USER_ACCOUNT_BAD} from '../errors'
import _ from 'lodash'

const find = (accounts, id)=> _.find(accounts, ['id', id]);

export const getCurrentFromRequest = req=> {
    if (req.account) {
        return req.account;
    }
    if (req.account === null) {
        throw USER_ACCOUNT_BAD
    }
    var id = req.params.aid || req.body.aid || req.query.aid;
    if (!id) {
        throw USER_ACCOUNT_REQUIRE
    }
    return associations.getFromRequest(req)
        .then(user=> {
            var account = find(user.accounts, id);
            if (!account) {
                throw USER_ACCOUNT_BAD
            }
            return account;
        })
};

export const getFromRequest = req=> {
    if (req.account || req.account === null) {
        return req.account;
    }
};

export const getInstagram = account=> Instagram.get(account);

export const promisifyCurrentAccount = callback=> (
    promisify(req=> (
        getCurrentFromRequest(req)
            .then(account=> callback(account, req))
    ))
);

const instagramLogin = (instagram, account, req)=> (
    instagram.login(req.body.password)
    .then(session=>session.getAccount())
    .then(({params: profile})=>(
        account.updateSettings({profile}).then(()=> ({account, profile}))
    ))
);

export const login = promisify(req=> (
    associations.getFromRequest(req)
        .then(user=>verifyAccountsCount(user)
            .then(getAvailable)
            .then(verify)
            .then(proxy=>(
                Account.create({
                    username: req.body.username
                })
                    .then(account=> Promise.all([
                            user.addAccount(account),
                            account.setProxy(proxy)
                        ])
                            .then(()=>new Instagram(account, false))
                            .then(instagram=> instagramLogin(instagram, account, req))
                    )
            ))
        )
));

export const destroy = promisifyCurrentAccount(account=> account.destroy().then(()=> true));

export const updateSettings = promisifyCurrentAccount((account, req)=> (
    account.updateSettings(req.body.value).then(account=> account.get())
));

export const reLoggedIn = promisifyCurrentAccount((account, req)=> (
    getAvailable()
        .then(verify)
        .then(proxy=> account.setProxy(proxy))
        .then(()=>Instagram.get(account))
        .then(instagram=>instagramLogin(instagram, account, req))
));

export const refresh = promisifyCurrentAccount(account=> (
    Instagram.get(account)
        .then(instagram=> instagram.getById(account.settings.profile.id))
        .then(({params: profile})=> (
            account.updateSettings({profile}).then(()=>({account, profile}))
        ))
));