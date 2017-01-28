import Request from './Request'
import {maxId, rankToken} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {tagId})=>(
        `feed/tag/${tagId}`
    ),
    method  :Method.GET,
    use     :[maxId, rankToken]
});