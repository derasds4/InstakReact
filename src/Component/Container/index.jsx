import {Component} from 'react'
import CSS from './index.less'

export default class Container extends Component{

    render(){
        return (
            <div className={CSS.Container}>
                {this.props.children}
            </div>
        )
    }

}