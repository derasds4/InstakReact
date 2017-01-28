import {Component} from 'react'
import {Container} from '../../UI'
import {connect} from 'react-redux'
import {} from

export default class SettingsPage extends Component {

    render() {
        return (
            <Container>
                <Translate component="h2" content="pages.settings.title" />
            </Container>
        )
    }

}