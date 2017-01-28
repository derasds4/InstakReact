export const maxId = (session, {maxId})=>(maxId ? {
    params: {
        max_id:maxId
    }
} : {});

export const rankToken = session=>({
    params: {
        rank_token: session.instagram.rankToken
    }
});

export const friendshipList = ()=>({
    params: {
        module: 'overview',
        support_new_api: 'true'
    }
});

export const friendshipSignedBody = (session, {userId})=> ({
    _csrftoken: session.instagram.session.csrfToken,
    user_id: userId,
    _uid: session.instagram.profile.pk,
    _uuid: session.instagram.session.uuid
});

export const likeSignedBody = (session, {mediaId})=> ({
    module_name: "feed_timeline",
    _csrftoken: session.instagram.session.csrfToken,
    media_id: mediaId,
    _uid: session.instagram.profile.pk,
    _uuid: session.instagram.session.uuid
});