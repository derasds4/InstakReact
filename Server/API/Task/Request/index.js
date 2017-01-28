import {
    Feed
} from '../../Instagram'
import feedRequest from './feed'

const defaultGetSource = source=> source.id;

const mediaExecute = ({account})=> account;

const execution = (feedAction, options = ({
    getSource: defaultGetSource,
    getItem: null
}))=> feedRequest(feedAction, options);


export const followers = execution(Feed.AccountFollowers);
export const followings = execution(Feed.AccountFollowing);
export const hashtag = execution(Feed.TaggedMedia, {
    getItem: mediaExecute,
    getSource: ({name})=> name
});
export const place = execution(Feed.LocationMedia, {
    getItem: mediaExecute,
    getSource: ({id})=> id
});
export const location = place;