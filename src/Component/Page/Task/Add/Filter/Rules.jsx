import Select from 'formsy-material-ui/lib/FormsySelect'
import MenuItem from 'material-ui/MenuItem'
import {Row, Col} from 'react-grid-system'

const items = ['private', 'business', 'picture', 'link'];
const values = [0, 1, 2];
const names = ['any', 'include', 'exclude'];

const Privacy = ({name})=> (
    <Select
        name={name}
        floatingLabelText={counterpart("pages.task.add.rules." + name + ".title")}
        value="any"
        style={{width: '100%'}}
    >
        {values.map(value=>(
            <MenuItem
                key={value}
                value={value}
                primaryText={counterpart("pages.task.add." + (
                    value === 'any'? 'rulePassive': ('rules.' + name + '.' + names[value])
                ))}
            />
        ))}
    </Select>
);

const Privacies = props=> (
    <Row>
        <Col>
            <Translate content="pages.task.add.section.filter.rules.title" component="h3"/>
        </Col>
        {items.map(item=> (
            <Col key={item} md={6}>
                <Privacy name={item} />
            </Col>
        ))}
    </Row>
);

export default Privacies