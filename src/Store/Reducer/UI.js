import merge from 'lodash/merge'

const getNewState = action=> {
    switch (action.type) {
        case 'UI_MENU_SET_OPENED':
            return {
                Menu: {
                    opened: !!action.value
                }
            };
        default:
            return null;
    }
};

export default (state = {
    Menu:{
        opened: false
    }
}, action)=> {
    var newState = getNewState(action);
    if(newState){
        return merge({}, state, newState);
    }
    return state;
}