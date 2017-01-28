export const type = {
    items: ['follow', 'unfollow', 'like']
};
export const sourceType = {
    items: ['followers', 'followings', 'hashtag', 'place', 'custom']
};
export const account = {
    require: {
        type: ['follow', 'like'],
        sourceType: ['followers', 'followings']
    }
};
export const hashtag = {
    require: {
        type: ['follow', 'like'],
        sourceType: ['hashtag']
    }
};