import {API, request, POST, GET} from './Request'
import {setAccount, setAccounts, updateSession} from '../Store/Action/User'

export const authorizeAccount = request(POST, '/account/login', {
    instance: API,
    dispatch: setAccount
});

export const getInfo = request(GET, '/user/current', {
    instance: API,
    dispatch: updateSession
});

export const freeLicenseIsAvailable = user=> user && user.settings && !user.settings.hasFreeLicense;

export const buyLicense = request(POST, '/user/license', {
    instance: API
});