import * as token from './token'
import {promisify} from '../helpers'
import {User} from '../../Models'
import {AUTH_USER_PASSWORD, AUTH_USER_USERNAME, AUTH_USER_EMAIL_BUSY} from '../errors'
import _ from 'lodash'

export {token}

export const authenticate = promisify(req=> {
    if (!req.body.username) {
        throw AUTH_USER_USERNAME
    }
    if (!req.body.password) {
        throw AUTH_USER_PASSWORD
    }
    return User.findOne({
        where: {
            $or: {
                username: req.body.username,
                email: req.body.username
            }
        }
    }).then(user=> {
        if (!user) {
            throw AUTH_USER_USERNAME
        }
        try{
            if (!user.verifyPassword(req.body.password)) {
                throw AUTH_USER_PASSWORD
            }
        }catch(e){
            console.log('Authenticate', req.body, e);
            throw AUTH_USER_PASSWORD
        }
        return token.getResponseByUser(user);
    })
});

export const signUp = promisify(req=> {
    return User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user=> {
        if(user){
            throw AUTH_USER_EMAIL_BUSY
        }
        return User.create(_.pick(req.body,['email', 'username', 'password', 'firstName', 'lastName']))
            .then(token.getResponseByUser);
    })
});