import Request from './Request'
import {maxId, rankToken, friendshipList} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {userId})=>(
        `friendships/${userId}/following`
    ),
    method  :Method.GET,
    use     :[maxId, rankToken, friendshipList]
})