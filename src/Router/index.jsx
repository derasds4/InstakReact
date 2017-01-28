import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Home from '../Component/Home'
import Application from '../Component/Application'
import * as Page from '../Component/Page'
import { syncHistoryWithStore } from 'react-router-redux'
import store from '../Store'

const history = syncHistoryWithStore(browserHistory, store);

export default (
    <Router history={history}>
        <Route path="/">
            <IndexRoute component={Home}/>
            <Route path="/app" component={Application}>
                <IndexRoute component={Page.Home} />
                <Route path="/app/task/add" component={Page.Task.Add} />
                <Route path="/app/license" component={Page.License} />
                <Route path="*" />
            </Route>
        </Route>
    </Router>
)