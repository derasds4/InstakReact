import {API, request, POST, GET, getState} from './Request'
import {setAccount, setAccounts, updateSession} from '../Store/Action/User'

export const getSessionParams = ()=> {
    const account = getState().User.account;
    if (!account || !account.id) {
        return {};
    }
    return {
        params: {
            aid: account.id
        }
    };
};

export const authorize = request(POST, '/account/login', {
    instance: API,
    dispatch: updateSession
});