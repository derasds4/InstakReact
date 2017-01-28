function getFeed(feed, session, source, cursor){
    feed = new feed(session, source);
    if (cursor) {
        feed.setCursor(cursor);
    }
    return feed.get()
        .then(data=> ({
            session: {
                moreAvailable: feed.moreAvailable,
                cursor: feed.cursor
            },
            data
        }));
}

export default function feedRequest(feed, options = {}) {
    return function wrappedFeedRequest(runner) {
        if (!runner.task.session.moreAvailable) {
            return Promise.resolve(null);
        }
        var source = runner.source;
        if (options.getSource) {
            source = options.getSource(source);
        }
        return getFeed(feed, runner.instagram.session, source, runner.task.session.cursor)
            .then(result=> {
                if (options.getItem && result.data) {
                    result.data = result.data.map(options.getItem);
                }
                return result;
            });
    }
}