import {Component} from 'react'
import {connect} from 'react-redux'
import Avatar from 'material-ui/Avatar'
import PersonIcon from 'material-ui/svg-icons/social/person'
import background from './background.png'
import FlatButton from 'material-ui/FlatButton'
import {setDialog} from '../../Store/Action/Application'

const style = {
    padding: 16,
    margin: 0,
    minHeight: 64,
    background: `#411ccb url("${background}") center no-repeat`,
    backgroundSize: 'cover',
    color: '#fff',
    position: 'relative'
};
const AccountAvatarStyle = {marginBottom: 16};
const LoginStyle = {
    fontSize: 15,
    marginBottom: 4,
    fontWeight: 500
};
const ProfileEmailStyle = {
    fontSize: 15,
    fontWeight: 300
};
const HelperStyle = {
    position: 'absolute',
    right: 16,
    bottom: 16
};

const AccountAvatar = props=> (
    <Avatar {...props} size={64} style={AccountAvatarStyle} />
);
const LoginButton = props=> (
    <FlatButton style={{color: '#fff'}} label={counterpart('actions.account.add')} onClick={props.onClick} />
);

@connect(state=>({
    hasAccount: state.User.profile && state.User.profile.id,
    profile: state.User.profile,
    accounts: state.User.accounts
}), {
    setDialog
})
export default class DrawerHeader extends Component{

    openDialog = ()=> this.props.setDialog('addAccount');

    render(){
        return (
            <div style={style}>
                <AccountAvatar {...(
                    this.props.hasAccount ? {src: this.props.profile.picture}: {
                        icon: <PersonIcon />
                    }
                )}/>
                <div style={LoginStyle}>
                    {this.props.hasAccount? this.props.profile.username: (
                        <Translate content="system.guest.username" />
                    )}
                </div>
                <div style={ProfileEmailStyle}>
                    {this.props.hasAccount? this.props.profile.username: (
                        <Translate content="system.guest.email" />
                    )}
                </div>
                <div style={HelperStyle}>
                    {!this.props.hasAccount? <LoginButton onClick={this.openDialog}/>: null}
                </div>
            </div>
        )
    }

}