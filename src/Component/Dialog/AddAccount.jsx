import {Text} from '../Formsy'
import Form from '../FormDialog'
import {authorizeAccount} from '../../Models/User'

const AddAccount = ()=>(
    <Form
        name="addAccount"
        submit={authorizeAccount}
        errorMessage={({message})=>counterpart('errors.' + message)}
        onSuccess={(response, dialog)=>dialog.close()}
    >
        <Text
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

export default AddAccount