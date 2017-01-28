import {Component} from 'react'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import map from 'lodash/map'
import {connect} from 'react-redux'
import {setDialog} from '../../../Store/Action/Application'

const additionalDialogs = {
    wrapper: {
        paddingTop: 8,
        textAlign: 'left'
    },
    button: {
        marginRight: 8
    },
    divider: {
        marginBottom: 8
    }
};

@connect(null, {
    setDialog
})
export class AdditionalDialogs extends Component {

    render() {
        const {items, setDialog} = this.props;

        return (
            <div style={additionalDialogs.wrapper}>
                <Divider style={additionalDialogs.divider}/>
                {map(items, ({name}, key)=> (
                    <RaisedButton
                        key={key}
                        style={additionalDialogs.button}
                        label={counterpart('dialog.' + name + '.title')}
                        onClick={()=> setDialog(name)}
                    />
                ))}
            </div>
        )
    }

}