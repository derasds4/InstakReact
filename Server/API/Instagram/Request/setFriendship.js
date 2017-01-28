import Request from './Request'
import {friendshipSignedBody} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {userId})=>(
        `friendships/create/${userId}`
    ),
    method  :Method.POST,
    use     :[friendshipSignedBody]
});