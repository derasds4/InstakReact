import {Container} from '../../../UI'
import {Component} from 'react'
import {Form} from '../../../Formsy'
import {connect} from 'react-redux'
import {updateAdditionKey} from '../../../../Store/Action/Task'
import {setPage} from '../../../../Store/Action/Application'
import {Tabs, Tab} from 'material-ui/Tabs'
import Tutorial from '../../../Tutorial'
import {Action, Target} from './Main'
import {Counters, Rules} from './Filter'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow'
import RequireLoginPage from '../../RequireLogin'

const playStyle = {
    position: 'fixed',
    right: 12,
    bottom: 12,
    zIndex: 10000
};

@connect(state=>({
    lang: state.Lang,
    data: state.Task.add,
    User: state.User
}),{
    updateAdditionKey,
    setPage
})
export default class TaskAddPage extends Component{

    state = {
        autoCompleteData: []
    };

    submit = value=>console.log(value);

    componentWillMount(){
        this.props.setPage('task.add');
    }

    loadAutoComplete(value){
        setTimeout()
    }

    render(){
        const {data, updateAdditionKey, User} = this.props;
        const isLoggedIn = !!(User.user && User.account);
        return (
            <Container
                condition={isLoggedIn}
                replaceWith={<RequireLoginPage/>}
            >
                <FloatingActionButton style={playStyle} onClick={()=>this.refs.form.submit()}>
                    <PlayIcon />
                </FloatingActionButton>
                <Translate content="pages.task.add.title" component="h2" />
                <Form ref="form" onValidSubmit={this.submit}>
                    <Tabs>
                        <Tab label={counterpart('pages.task.add.section.main.title')}>
                            <Tutorial name="taskAddMain" items={['selectType', 'addTargets']} />
                            <Action data={data} updateAdditionKey={updateAdditionKey} />
                            <Target data={data} updateAdditionKey={updateAdditionKey} />
                        </Tab>
                        <Tab label={counterpart('pages.task.add.section.filter.title')}>
                            <Counters />
                            <Rules />
                        </Tab>
                    </Tabs>
                </Form>
            </Container>
        )
    }

}