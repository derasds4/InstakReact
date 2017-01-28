import axios from 'axios'
import defaults from 'lodash/defaults'
import debounce from 'lodash/debounce'
import merge from 'lodash/merge'
import store from '../Store'
import {logOut} from '../Store/Action/User'

export const GET = 'get';
export const PUT = 'put';
export const HEAD = 'head';
export const POST = 'post';
export const PATCH = 'patch';
export const DELETE = 'delete';

export const {dispatch, getState} = store;

export const response = ({data: {error, response}})=>{
    if(error){
        switch (error) {
            case 'auth.token.bad':
                dispatch(logOut());
                break;
        }
        throw new Error(error);
    }
    return response;
};

export const request = (method, path, options = {})=>{
    options = defaults(options, {
        instance: axios,
        dispatch: null,
        defaults: {},
        prepare: null
    });
    return data=> {
        let session = {
            path,
            options: defaults(data, options.defaults)
        };
        if (options.prepare) {
            session = merge(session, options.prepare(session));
        }
        return options.instance[method](session.path, session.options)
            .then(res=>{
                if(res.data.response){
                    if(options.onResponse) {
                        options.onResponse(res.data.response);
                    }
                    if(options.dispatch){
                        dispatch(options.dispatch(res.data.response));
                    }
                }
                return response(res);
            })
    };
};

export const API = axios.create({
    baseURL: '/api/'
});

const authState = {
    token: null,
    accountId: null
};

store.subscribe(debounce(()=>{
    const {User: {token}} = store.getState();
    if (!token) {
        delete API.defaults.headers.common['x-access-token'];
        authState.token = null;
    } else if (authState.token !== token) {
        API.defaults.headers.common['x-access-token'] = token;
        authState.token = token;
    }
}, 200));