export default (state = 'en', action)=>{
    switch (action.type) {
        case 'LANGUAGE_SET':
            counterpart.setLocale(action.value);
            return action.value;
        default:
            return state;
    }
}
