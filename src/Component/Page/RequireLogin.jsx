import {Component} from 'react'
import {connect} from 'react-redux'
import {setDialog, setPage} from '../../Store/Action/Application'
import Avatar from 'material-ui/Avatar'
import ReportIcon from 'material-ui/svg-icons/action/report-problem'
import RaisedButton from 'material-ui/RaisedButton'
import {Container} from '../UI'
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper'
import {Link} from 'react-router'

const styleMain = {
    paddingTop: 40,
    textAlign: 'center'
};
const styleAvatarContainer = {
    paddingBottom: 20
};
const buttonStyle = {
    marginRight: 10,
    marginLeft: 10
};
const style = {
    stepper: {
        textAlign: 'left',
        maxWidth: 600,
        margin: '0 auto'
    },
    buttonLink: {
        marginLeft: 8,
        marginBottom: 8
    }
};

const Button = ({disabled, name, onClick})=> (
    <RaisedButton
        style={buttonStyle}
        disabled={disabled}
        primary={true}
        label={counterpart('actions.' + name)}
        onClick={onClick} />
);

@connect(state=> {
    const {user, account, license} = state.User;
    return {
        lang: state.Lang,
        userId: user && user.id,
        accountId: account && account.id,
        license: license
    }
}, {
    setDialog,
    setPage
})
export default class RequireLoginPage extends Component{

    openDialog = name=>
        ()=> this.props.setDialog(name);

    componentWillMount(){
        this.props.setPage('requireLogin');
    }

    render(){
        const {userId, accountId, license} = this.props;
        const activeStep = !userId ? 0 : (!license ? 1 :2);

        return (
            <Container>
                <div style={styleMain}>
                    <div style={styleAvatarContainer}>
                        <Avatar icon={<ReportIcon />} size={80} />
                    </div>
                    <div style={styleAvatarContainer}>
                        <Translate component="h3" content="pages.requireLogin.content" />
                    </div>
                    <Stepper activeStep={activeStep} orientation="vertical" style={style.stepper}>
                        <Step>
                            <StepLabel>
                                <Translate content="pages.requireLogin.user.title" />
                            </StepLabel>
                            <StepContent>
                                <Translate component="p" content="pages.requireLogin.user.content" />
                                <Button name="login" disabled={userId} onClick={this.openDialog('login')} />
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>
                                <Translate content="pages.requireLogin.license.title" />
                            </StepLabel>
                            <StepContent>
                                <Translate component="p" content="pages.requireLogin.license.content" />
                                <Link to="/app/license">
                                    <RaisedButton
                                        label={<Translate content="pages.requireLogin.license.button" />}
                                        primary={true}
                                        style={style.buttonLink}
                                    />
                                </Link>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
            </Container>
        )
    }

}