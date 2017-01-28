'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var maxId = exports.maxId = function maxId(session, _ref) {
    var maxId = _ref.maxId;
    return maxId ? {
        params: {
            max_id: maxId
        }
    } : {};
};

var rankToken = exports.rankToken = function rankToken(session) {
    return {
        params: {
            rank_token: session.instagram.rankToken
        }
    };
};

var friendshipList = exports.friendshipList = function friendshipList() {
    return {
        params: {
            module: 'overview',
            support_new_api: 'true'
        }
    };
};

var friendshipSignedBody = exports.friendshipSignedBody = function friendshipSignedBody(session, _ref2) {
    var userId = _ref2.userId;
    return {
        _csrftoken: session.instagram.session.csrfToken,
        user_id: userId,
        _uid: session.instagram.profile.pk,
        _uuid: session.instagram.session.uuid
    };
};

var likeSignedBody = exports.likeSignedBody = function likeSignedBody(session, _ref3) {
    var mediaId = _ref3.mediaId;
    return {
        module_name: "feed_timeline",
        _csrftoken: session.instagram.session.csrfToken,
        media_id: mediaId,
        _uid: session.instagram.profile.pk,
        _uuid: session.instagram.session.uuid
    };
};