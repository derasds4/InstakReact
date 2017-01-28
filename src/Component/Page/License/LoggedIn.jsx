import CurrentLicense from './Current'
import {Form} from '../../Formsy'
import {Row, Col} from 'react-grid-system'
import {Type, Months} from './SelectFields'
import RaisedButton from 'material-ui/RaisedButton'
import style from './style.less'
import {license} from '../../../../config'
import {buyLicense} from '../../../Models/User'

export default class LoggedInLicensePage extends React.Component {

    static propTypes = {
        user: React.PropTypes.object.isRequired,
        license: React.PropTypes.any
    };

    state = {
        formIsValid: true,
        valueType: this.props.freeLicenseAvailable ? 'free' : 'start',
        valueTime: '1',
        submit: false
    };

    setValid = value=> this.setState({
        formIsValid: value
    });

    getValueListener = name=>
        value=> this.setState({
            ['value' + name]: value
        });

    submit = data=> {
        this.setState({
            submit: true
        });
        buyLicense(data)
            .then(response=> {
                if (response.license) {
                    this.props.updateUser({
                        license: response.license
                    });
                } else if (response.redirect) {
                    location.href = response.redirect;
                }
            })
            .catch(error=> console.error(error))
            .finally(()=> this.setState({submit: false}));
    };

    get price() {
        if (this.state.valueType === 'free') {
            return 0;
        }
        return license[this.state.valueType].prices[this.state.valueTime];
    }

    render() {
        return (
            <div>
                <Translate component="h2" content="pages.license.title" />
                {this.props.license && <CurrentLicense license={this.props.license}/>}
                <Translate component="h3" content="pages.license.buy.title" />
                <Form
                    ref={form=> this.form = form}
                    onValid={()=> this.setValid(true)}
                    onInvalid={()=> this.setValid(false)}
                    onValidSubmit={this.submit}
                    target="License"
                >
                    <Row>
                        <Col md={6}>
                            <Type
                                freeLicenseAvailable={this.props.freeLicenseAvailable}
                                value={this.state.valueType}
                                onChange={this.getValueListener('Type')}
                            />
                        </Col>
                        <Col md={6}>
                            <Months
                                isFree={this.state.valueType === 'free'}
                                freeLicenseAvailable={this.props.freeLicenseAvailable}
                                value={this.state.valueTime}
                                onChange={this.getValueListener('Time')}
                            />
                        </Col>
                    </Row>
                    <div className={style.Total}>
                        <Translate component="h3" content="pages.license.total" />
                        <div className={style.TotalPrice}>{this.price}</div>
                    </div>
                    <RaisedButton
                        primary={true}
                        disabled={this.state.submit || !this.state.formIsValid}
                        onClick={()=> this.state.formIsValid && this.form.submit()}
                        label={<Translate content="actions.license.buy" />}
                    />
                </Form>
            </div>
        )
    }

}