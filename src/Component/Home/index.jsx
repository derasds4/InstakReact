import {Component} from 'react'
import Header from './Header'
import Top from './Top'
import Our from './Our'
import Replies from './Replies'
import Prices from './Prices'
import Footer from './Footer'
import CSS from './index.less'

export default class Home extends Component{

    render(){
        return (
            <div className="landing" id={CSS.Home}>
                <Header {...this.props} />
                <Top />
                <Our />
                <Replies />
                <Prices />
                <Footer />
            </div>
        )
    }

}