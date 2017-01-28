import {Select} from '../../Formsy'
import map from 'lodash/map'
import keys from 'lodash/keys'
import flatten from 'lodash/flatten'
import compact from 'lodash/compact'
import {license} from '../../../../config'
import MenuItem from 'material-ui/MenuItem'
import style from './style.less'

const licenseKeys = keys(license);
const licenseTimes = ['1', '3', '6'];

const Prop = ({disabled = false, name, value, onChange, items})=> (
    <Select
        className={style.SelectField}
        name={name}
        value={value}
        disabled={disabled}
        floatingLabelText={counterpart('pages.license.props.' + name + '.title')}
        onChange={(e,value)=> onChange(value)}
    >{map(compact(flatten(items)), key=> (
        <MenuItem key={key} value={key} primaryText={<Translate content={'pages.license.props.' + name + '.' + key}/>} />
    ))}</Select>
);

export const Type = ({freeLicenseAvailable, value, onChange})=> (
    <Prop
        name="type"
        value={value}
        onChange={onChange}
        items={[
            freeLicenseAvailable ? 'free' : null,
            ...licenseKeys
        ]}
    />
);
export const Months = ({freeLicenseAvailable, value, onChange, isFree})=> (
    <Prop
        name="time"
        disabled={isFree}
        value={isFree ? 'free' : value}
        onChange={onChange}
        items={isFree ? ['free'] : licenseTimes}
    />
);