import _ from 'lodash'

export const applyRoute = (router, {method, path, execute})=> {
    if (!_.isArray(execute)) {
        execute = [execute]
    }
    router[method](path, ...execute);
};

export const applyRoutes = (router, routes)=> {
    if (!_.isArray(routes)) {
        routes = [routes];
    }
    _.each(routes, route=> applyRoute(router, route));
};