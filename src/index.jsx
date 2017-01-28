import DOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './Store'
import router from './Router/index'
import './style/index.less'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin();
DOM.render(
    <Provider store={store}>{router}</Provider>,
    document.getElementById('root')
);

document.addEventListener('DOMContentLoaded',()=>{
    document.body.style.opacity = 1;
});