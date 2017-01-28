import Request from './Request'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {userId})=>(
        `users/${userId}/info`
    ),
    method  :Method.POST
});