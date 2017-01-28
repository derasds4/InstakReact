import Request from './Request'
import {Method} from '../Constants'

export default new Request({
    path    : 'accounts/login',
    method  : Method.POST,
    static  : {
        useInstagramCookies: true
    },
    execute :({instagram}, {username, password})=>({
        params:{
            username,
            password,
            guid: instagram.session.guid,
            phone_id: instagram.session.phoneId,
            device_id: instagram.session.deviceId,
            _csrftoken: instagram.session.csrfToken
        }
    })
});