import Request from './Request'
import {maxId} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {userId})=>(
        `feed/user/${userId}`
    ),
    method  :Method.GET,
    use     :[maxId]
});