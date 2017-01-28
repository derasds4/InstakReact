import {Text} from '../Formsy'
import Form from '../FormDialog'
import {signUp} from '../../Models/Auth'
import {AdditionalDialogs} from '../UI/Form/Actions'

const items = [{
    name: 'login'
}, {
    name: 'resetPassword'
}];

const Signup = ()=>(
    <Form
        name="signup"
        submitName="signupAction"
        submit={signUp}
        actions={[
            <AdditionalDialogs
                key="additionalDialogs"
                items={items}
            />
        ]}
    >
        <Text
            autoFocus
            name="email"
            validations="isEmail"
            required
            floatingLabelText={counterpart('dialog.signup.email.title')}
            fullWidth={true}
        />
        <Text
            name="password"
            type="password"
            required
            floatingLabelText={counterpart('dialog.signup.password.title')}
            fullWidth={true}
        />
    </Form>
);

export default Signup