import Request from './Request'
import {likeSignedBody} from '../Actions'
import {Method} from '../Constants'

export default new Request({
    path    :(session, {mediaId})=>(
        `media/${mediaId}/unlike`
    ),
    method  :Method.POST,
    use     :[likeSignedBody],
    static  :{
        params:{
            d:0
        }
    }
});