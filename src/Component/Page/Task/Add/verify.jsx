import * as items from './items'
import filter from 'lodash/filter'
import map from 'lodash/map'
import every from 'lodash/every'
import {Column} from './components'

export const verify = (data, item)=> !!every(item.require, (value, name)=>value.indexOf(data[name]) > -1);

export const filterGroup = group=> filter(group, item=>!!item);

export const verifyItem = (item, data)=>{
    item = items[item];
    if(!item.require){
        return item;
    }
    return (verify(item, data) && item) || null;
};

export const getVerifiedColumn = (name, data, getComponent)=>{
    var item = verifyItem(name, data);
    if(!item){
        return null;
    }
    return (
        <Column key={name}>
            {getComponent(item, name)}
        </Column>
    );
};

export const getVerifiedColumns = (names, data, getComponent)=> (
    filterGroup(
        map(names, name=>getVerifiedColumn(name, data, getComponent))
    )
);