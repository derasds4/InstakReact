import Request from './Request'
import {Method} from '../Constants'
import {v4} from 'node-uuid'

export default new Request({
    path: 'si/fetch_headers',
    method: Method.GET,
    execute: ()=>({
        params: {
            challenge_type: 'signup',
            guid: v4().replace('-', '')
        }
    })
})