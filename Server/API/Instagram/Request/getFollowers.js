import Request from './Request'
import {maxId, rankToken, friendshipList} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {userId})=>(
        `friendships/${userId}/followers`
    ),
    method  :Method.GET,
    use     :[maxId, rankToken, friendshipList]
})