/*import _ from 'lodash'

export const create = (key, names, prefix = '')=> {
    if (_.isObject(names)) {
        return _.assign(..._.map(names, (value, name)=>(
            create(key, value, prefix + name + '.')
        )))
    }
    return _.zipObject(
        map(names, name=> prefix + name.replace('.', '_').toUpperCase()),
        map(names, name=> new Error(`${key}.${name}`))
    );
};

export const AUTH = create('auth', {
    user: ['bad', 'username', 'password'],
    token: ['bad', 'empty']
});*/

export const AUTH_USER_BAD = new Error('auth.user.bad');
export const AUTH_TOKEN_BAD = new Error('auth.token.bad');
export const AUTH_TOKEN_EMPTY = new Error('auth.token.empty');
export const AUTH_USER_USERNAME = new Error('auth.user.username');
export const AUTH_USER_PASSWORD = new Error('auth.user.password');
export const AUTH_USER_EMAIL_BUSY = new Error('auth.user.emailBusy');

export const USER_LICENSE_BAD = new Error('user.license.bad');
export const USER_ACCOUNT_LIMIT = new Error('user.account.limit');
export const USER_ACCOUNT_REQUIRE = new Error('user.account.require');
export const USER_ACCOUNT_BAD = new Error('user.account.bad');