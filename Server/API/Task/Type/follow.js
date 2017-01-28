import {Relationship, Like, Feed} from '../../Instagram'
import RuleSet from '../Ruleset'

export default new RuleSet({

    action: 'follow',
    targetType: 'account',
    execute: ({task: {settings}, instagram: {session}}, account)=> {
        const {id} = account;
        return Relationship.create(session, id)
            .then(()=> {
                if (!settings.likeMedia) {
                    return null;
                }
                return new Feed.UserMedia(session, id).get()
                    .then(([post])=> {
                        if (post) {
                            return Like.create(session, post.id);
                        }
                        return null;
                    });
            })
            .then(()=> ({
                type: 'follow',
                status: 'ok',
                account: account.params
            }))
    }

});