import jwt from 'jsonwebtoken'
import _ from 'lodash'
import {AUTH_TOKEN_BAD, AUTH_TOKEN_EMPTY, AUTH_USER_BAD} from '../errors'
import {sendError} from '../helpers'

const secret = 'j&k2b`72befcl/He3';

export const getByUser = user=> {
    if(!user.id){
        throw AUTH_USER_BAD;
    }
    return jwt.sign({
        id: user.id,
        email: user.email,
        password: user.password
    }, secret);
};

export const getResponseByUser = user=>({
    user: user.toJSON(),
    token: getByUser(user)
});

export const verify = (req, res, next)=>{
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return sendError(res, AUTH_TOKEN_EMPTY);
    }
    jwt.verify(token, secret, error=> {
        if (error) {
            return sendError(res, AUTH_TOKEN_BAD);
        }
        req.loggedIn = _.omit(jwt.decode(token, {json: true, complete: true}).payload, ['iat']);
        next();
    });
};