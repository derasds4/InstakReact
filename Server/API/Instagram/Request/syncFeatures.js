import Request from './Request'
import {Method, EXPERIMENTS, LOGIN_EXPERIMENTS} from '../Constants'
import {v4} from 'node-uuid'

export default new Request({
    path: 'qe/sync/',
    method: Method.POST,
    execute: ({instagram}, force)=>({
        params: (force ? {
            experiments: LOGIN_EXPERIMENTS,
            id: v4()
        } : {
            _uuid: instagram.session.uuid,
            _uid: instagram.profile.pk,
            _csrftoken: instagram.session.csrfToken,
            id: instagram.profile.pk,
            experiments: EXPERIMENTS
        })
    })
})