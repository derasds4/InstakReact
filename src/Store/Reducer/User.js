import merge from 'lodash/merge'

export default (state = {
    user: null,
    token: null,
    account: null,
    profile: null,
    accounts: null
}, action)=>{
    switch (action.type){
        case 'USER_UPDATE':
            return merge({}, state, action.value);
        default:
            return state;
    }
}