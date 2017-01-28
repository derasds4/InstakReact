import {Text} from '../Formsy'
import Form from '../FormDialog'
import {signUp} from '../../Models/Auth'
import {AdditionalDialogs} from '../UI/Form/Actions'

const items = [{
    name: 'login'
}, {
    name: 'signup'
}];

const Signup = ()=>(
    <Form
        name="resetPassword"
        submitName="submit"
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
            floatingLabelText={counterpart('dialog.resetPassword.email.title')}
            fullWidth={true}
        />
    </Form>
);

export default Signup