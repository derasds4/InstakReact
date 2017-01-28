import {getCurrentFromRequest, promisifyCurrentAccount, getInstagram} from './Account'
import {Hashtag, Account} from '../../API/Instagram'
import {promisify} from '../helpers'

const wrapSearch = model=> (
    promisifyCurrentAccount((account, req)=> (
        getInstagram(account)
            .then(({session})=> model.search(session, req.query.q))
            .then(items=> items.map(item=> item.params))
    ))
);

export const hashtag = wrapSearch(Hashtag);

export const account = wrapSearch(Account);