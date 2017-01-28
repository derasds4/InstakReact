import Menu from './Menu'
import Header from './Header'
import Dialogs from './Dialog'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RequireLoginPage from './Page/RequireLogin'
import {Component} from 'react'
import {connect} from 'react-redux'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#411ccb'
    }
});

@connect(state=>({
    isLoggedIn: state.User && state.User.token
}))
export default class Application extends Component{

    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id="Application">
                    <Menu/>
                    <Header/>
                    {Dialogs}
                    {this.props.isLoggedIn? this.props.children: <RequireLoginPage/>}
                </div>
            </MuiThemeProvider>
        )
    }

}