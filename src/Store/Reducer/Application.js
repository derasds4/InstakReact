import merge from 'lodash/merge'

export default (state = {
    lang: 'en',
    page: 'home',
    dialog: null,
    stepper: {
        taskAddMain: {
            index: 0,
            closed: false
        },
        taskAddFilter: {
            index: 0,
            closed: false
        }
    },
    UI: {
        Menu:{
            opened: false
        }
    }
}, action)=>{
    switch (action.type) {
        case 'APP_SET_PAGE':
            return {...state, page: action.value};
        case 'APP_SET_DIALOG':
            return {...state, dialog: action.value};
        case 'APP_UPDATE_STEPPER':
            return merge({}, state, {
                stepper: action.value
            });
        default:
            return state
    }
}