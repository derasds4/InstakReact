import {Text} from '../Formsy'
import Form from '../FormDialog'
import {logIn} from '../../Models/Auth'
import {AdditionalDialogs} from '../UI/Form/Actions'

const items = [{
    name: 'signup'
}, {
    name: 'resetPassword'
}];

const Login = ()=>(
    <Form
        name="login"
        submit={logIn}
        errorMessage={({message})=>counterpart('errors.' + message)}
        onSuccess={(response, dialog)=>dialog.close()}
        actions={[
            <AdditionalDialogs
                key="additionalDialogs"
                items={items}
            />
        ]}
    >
        <Text
            autoFocus
            name="username"
            required
            floatingLabelText={counterpart('dialog.login.username.title')}
            fullWidth={true}
        />
        <Text
            name="password"
            type="password"
            required
            floatingLabelText={counterpart('dialog.login.password.title')}
            fullWidth={true}
        />
    </Form>
);

export default Login