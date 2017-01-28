import merge from 'lodash/merge'

export default (state = {
    add: {
        type: 'follow',
        sourceType: 'followers',
        source: ''
    }
}, action)=>{
    switch (action.type) {
        case 'TASK_SET_ADD':
            return merge({}, state, {
                add: action.value
            });
        default:
            return state;
    }
}