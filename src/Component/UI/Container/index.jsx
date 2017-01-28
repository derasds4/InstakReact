import {Component, PropTypes} from 'react'
import CSS from './index.less'
import isBoolean from 'lodash/isBoolean'

export default class Container extends Component{

    static defaultProps = {
        condition: null,
        replaceWith: null
    };

    static propTypes = {
        condition: PropTypes.bool,
        replaceWith: PropTypes.any
    };

    render(){
        if (isBoolean(this.props.condition) && !this.props.condition) {
            return this.props.replaceWith || null;
        }
        return (
            <div className={CSS.Container}>
                {this.props.children}
            </div>
        )
    }

}