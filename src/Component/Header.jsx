import {Component, Children} from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import {connect} from 'react-redux'
import {setOpened} from '../Store/Action/UI/Menu'
import {setDialog} from '../Store/Action/Application'
import {set} from '../Store/Action/Lang'
import {logOut} from '../Store/Action/User'
import * as langs from '../config/lang'
import map from 'lodash/map'
import Responsive from 'react-responsive'
import {dispatch} from '../Models/Request'

const langItems = map(langs, ({langName}, key)=>(
    <MenuItem key={key} primaryText={langName} onClick={()=> dispatch(set(key))} />
));

const Logged = (props)=>(
    <IconMenu
        {...props}
        iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
        <MenuItem
            primaryText={counterpart("actions.selectLanguage")}
            leftIcon={<ChevronLeft />}
            menuItems={langItems}
        />
        <Divider />
        <MenuItem primaryText={counterpart("actions.logout")} onClick={props.onClick} />
    </IconMenu>
);
Logged.muiName = 'IconMenu';

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        const {onClick} = this.props;
        return (
            <FlatButton {...this.props} onClick={()=>onClick('login')} label={counterpart('actions.login')} />
        );
    }
}

@connect(state=>({
    Lang: state.Lang,
    opened: state.UI.Menu.opened,
    isLoggedIn: state.User && state.User.user,
    pageName: state.Application.page
}),{
    setOpened,
    setDialog,
    logOut
})
export default class Header extends Component{

    render(){
        const props = {
            iconElementRight: this.props.isLoggedIn? <Logged
                onClick={this.props.logOut}
            /> : <Login onClick={this.props.setDialog}/>,
            title: counterpart('pages.' + this.props.pageName + '.title')
        };
        return (
            <Responsive minWidth={768}>
                {match=>(match
                    ? <AppBar {...props} />
                    : <AppBar {...props} onLeftIconButtonTouchTap={
                        ()=>this.props.setOpened(true)
                    } />
                )}
            </Responsive>
        )
    }

}