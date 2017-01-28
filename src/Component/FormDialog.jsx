import {Form} from './Formsy'
import {Component, PropTypes} from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import Dialog from 'material-ui/Dialog'
import {setDialog} from '../Store/Action/Application'
import {connect} from 'react-redux'
import assign from 'lodash/assign'
import isFunction from 'lodash/isFunction'

const defaultStyle = {
    lineHeight: '20px',
    fontSize: '15px'
};
const statusStyle = [{}, {
    color: '#4CAF50'
}, {
    color: '#f44336'
}];
const Status = {
    LOADING: 0,
    SUCCESS: 1,
    ERROR: 2
};

const styleProgress = {marginTop: 10};
const styleActionCancel = {marginRight: 16}

export class FormMessage extends Component{

    getMessageContent(content, value){
        if(isFunction(content)){
            return content(value);
        }
        return content;
    }

    getMessage(){
        switch (this.props.status) {
            case Status.SUCCESS:
                return this.getMessageContent(this.props.successMessage, this.props.success);
            case Status.ERROR:
                return this.getMessageContent(this.props.errorMessage, this.props.error);
            default:
                return '';
        }
    }

    static defaultProps = {
        error: null,
        success: null,
        status: 0,
        successMessage: '',
        errorMessage: ''
    };

    render(){
        const style = assign({}, defaultStyle, statusStyle[this.props.status]);
        if (this.props.status === Status.LOADING) {
            return null;
        }
        return (
            <div style={style}>{this.getMessage()}</div>
        )
    }

}

@connect(state=>({
    lang: state.Lang,
    opened: state.Application.dialog
}), {
    setDialog
})
export default class FormDialog extends Component{

    static propTypes = {
        name: PropTypes.string.isRequired
    };

    static defaultProps = {
        name: '',
        modal: false,
        submit: ()=>Promise.resolve(),
        onError: ()=> {},
        onSuccess: (res, dialog)=> dialog.close(),
        onComplete: ()=> {},
        successMessage: '',
        errorMessage: ({message})=> counterpart('errors.' + message),
        submitName: 'loginAction'
    };

    close = ()=> {
        this.setState({
            isValid: false,
            response: null,
            loading: false,
            error: null
        });
        this.props.setDialog(null);
    };
    enable = ()=>this.setState({isValid: true});
    disable = ()=>this.setState({isValid: false});
    submit = data=>{
        this.setState({
            loading: true,
            response: null,
            error: null
        });
        this.props.submit(data)
            .then(response=>{
                this.setState({error: null, response});
                this.props.onSuccess(response, this);
            })
            .catch(error=>{
                this.setState({response: null, error});
                this.props.onError(error, this);
            })
            .finally((...args)=>{
                this.setState({
                    loading: false
                });
                this.props.onComplete(...args);
            })
    };

    clear = ()=> {
        if (this.loading) {
            return null;
        }
        this.setState({
            error: null,
            response: null,
            loading: false
        });
    };

    state = {
        isValid: false,
        response: null,
        loading: false,
        error: null
    };

    render(){
        const status = this.state.error? Status.ERROR: (this.state.response? Status.SUCCESS: Status.LOADING);
        var actions = [
            <FlatButton
                key="cancel"
                type="reset"
                label={counterpart('actions.cancel')}
                primary={true}
                onTouchTap={this.close}
                style={styleActionCancel}
            />,
            <RaisedButton
                key="submit"
                type="submit"
                label={counterpart('actions.' + this.props.submitName)}
                primary={true}
                disabled={!this.state.isValid}
                onTouchTap={()=>{
                    if(!this.state.loading){
                        this.form.submit()
                    }
                }}
            />
        ];
        if (this.props.actions) {
            actions = actions.concat(this.props.actions);
        }
        if (this.state.loading) {
            actions.push(<LinearProgress mode="indeterminate" style={styleProgress} />);
        }
        return (
            <Dialog
                open={this.props.opened === this.props.name}
                modal={this.props.modal}
                title={
                    <div>
                        <span>{counterpart('dialog.' + this.props.name + '.title')}</span>
                        <FormMessage
                            error={this.state.error}
                            success={this.state.response}
                            status={status}
                            errorMessage={this.props.errorMessage}
                            successMessage={this.props.successMessage}
                        />
                    </div>
                }
                actions={actions}
                onRequestClose={this.close}
                autoScrollBodyContent={true}
            >
                <Form
                    onChange={this.clear}
                    onValid={this.enable}
                    onInvalid={this.disable}
                    onValidSubmit={this.submit}
                    ref={form=>{this.form = form}}
                    onKeyUp={event=> this.state.isValid && event.which === 13 && this.form.submit()}
                >{this.props.children}</Form>
            </Dialog>
        )
    }

}