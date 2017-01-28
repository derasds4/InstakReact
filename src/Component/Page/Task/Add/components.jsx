import SelectBox from 'formsy-material-ui/lib/FormsySelect'
import FormsyAutoComplete from 'formsy-material-ui/lib/FormsyAutoComplete'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import {Col} from 'react-grid-system'
import items from './items'

const selectStyle = {
    width: '100%'
};

export const Select = ({ data, updateAdditionKey, name, item })=>{
    return (
        <SelectBox
            name={name}
            floatingLabelText={counterpart('pages.task.add.elements.' + name + '.title')}
            value={data[name]}
            disabled={false}
            onChange={(event, value)=>updateAdditionKey(name, value)}
            style={selectStyle}
        >
            {map(item.items, key=>(
                <MenuItem
                    key={key}
                    value={key}
                    primaryText={counterpart('pages.task.add.elements.' + name + '.items.' + key)}
                />
            ))}
        </SelectBox>
    );
};

export const AutoComplete = ({ name })=> {
    return (
        <FormsyAutoComplete
            name={name}
            dataSource={[
                'my_acc',
                "instagram"
            ]}
            floatingLabelText={counterpart('pages.task.add.elements.' + name + '.title')}
        />
    );
};