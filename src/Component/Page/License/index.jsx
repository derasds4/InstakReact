import {connect} from 'react-redux'
import Page from '../Page'
import LoggedIn from './LoggedIn'
import {freeLicenseIsAvailable} from '../../../Models/User'
import {updateUser} from '../../../Store/Action/User'

@connect(({User: {user, license}})=> ({
    isLoggedIn: !!(user && user.id),
    license,
    user,
    freeLicenseAvailable: freeLicenseIsAvailable(user)
}), {
    updateUser
})
export default class LicensePage extends React.Component {
    render() {
        return (
            <Page condition={this.props.isLoggedIn} name="license">
                {this.props.user ? <LoggedIn {...this.props}/> : null}
            </Page>
        )
    }
}