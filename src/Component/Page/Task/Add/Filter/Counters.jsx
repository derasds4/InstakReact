import {Col, Row} from 'react-grid-system'
import TextField from 'formsy-material-ui/lib/FormsyText'

const items = ['followers', 'followings', 'media'];

const CounterField = ({name, prop})=> (
    <TextField
        name={`filter[${name}][${prop}]`}
        validations="isNumeric"
        floatingLabelText={counterpart('actions.state.' + prop)}
        style={{width: '100%'}}
    />
);

const Counter = ({name})=> (
    <Row>
        <Col>
            <Translate component="h3" content={"pages.task.add.section.filter." + name + ".title"} />
        </Col>
        <Col md={6}>
            <CounterField name={name} prop="min" />
        </Col>
        <Col md={6}>
            <CounterField name={name} prop="max" />
        </Col>
    </Row>
);

const Counters = props=> (
    <div>
        {items.map(item=> <Counter name={item} key={item} />)}
    </div>
);

export default Counters