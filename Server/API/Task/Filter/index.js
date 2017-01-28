import _ from 'lodash'

const counterFilter = name=> (
    (account, filter)=> (
        !_.isNumber(account[name]) ||
        (!_.isNumber(filter.min) || account[name] < filter.min) &&
        (!_.isNumber(filter.max) || account[name] > filter.max)
    )
);

const ruleFilter = name=> (
    (account, filter)=> (
        !filter ||
        (filter === 1 && !!account[name]) ||
        (filter === 2 && !account[name])
    )
);

export const followers = counterFilter('followerCount');
export const followings = counterFilter('followingCount');
export const media = counterFilter('mediaCount');
export const privacy = ruleFilter('isPrivate');
export const business = ruleFilter('isBusiness');
export const picture = ruleFilter('picture');
export const link = ruleFilter('externalUrl');