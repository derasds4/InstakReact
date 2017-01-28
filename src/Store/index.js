import {createStore, combineReducers} from 'redux'
import * as reducers from './Reducer'
import {save, load} from './localStorage'
import { routerReducer } from 'react-router-redux'
import debounce from 'lodash/debounce'

const store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer
}), load());

counterpart.setLocale(store.getState().Lang);
store.subscribe(debounce(()=>{
    save(store.getState());
}), 250);

export default store;
