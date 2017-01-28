import {request, POST, dispatch} from './Request'
import {updateSession, logOut as logOutUser} from '../Store/Action/User'

const dispatchAuth = data=>dispatch(updateSession(data));

export const logIn = request(POST, '/auth/login', {
    onResponse: dispatchAuth
});

export const signUp = request(POST, '/auth/signup', {
    onResponse: dispatchAuth
});

export const logOut = ()=>dispatch(logOutUser());