import {Container} from '../UI'
import {connect} from 'react-redux'
import RequireLoginPage from './RequireLogin'
import {setPage} from '../../Store/Action/Application'

@connect(null, {
    setPage
})
export default class Page extends React.Component {
    static defaultProps = {
        condition: false,
        replaceWith: <RequireLoginPage/>,
        path: '/',
        name: 'page'
    };

    static propTypes = {
        condition: React.PropTypes.bool,
        replaceWith: React.PropTypes.any,
        path: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    };

    componentWillMount() {
        this.props.setPage(this.props.name);
    }

    render() {
        return (
            <Container condition={this.props.condition} replaceWith={this.props.replaceWith}>
                {this.props.children}
            </Container>
        )
    }
}