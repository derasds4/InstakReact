import CSS from './index.less'
import {Component} from 'react'
import map from 'lodash/map'
import * as source from './source'
import Lazy from 'react-lazyload'
import * as flag from '../../../source/flag'
import {connect} from 'react-redux'

const infoItems = [
    ["offices", "about", "docs", "qa"],
    ["partners", "politics", "articles"]
];
const moneyItems = ["tls", "visa", "mastercard"];
const socialItems = {
    vk: 'https://vk.com',
    fb: 'https://facebook.com',
    yt: 'https://youtube.com',
    tw: 'https://twitter.com'
};

const Aside = ({ items, name })=>(
    <aside>
        {map(items, value=>(
            <a href={"#" + value} key={value}>
                <Translate content={"home.section.footer.links." + name + "." + value} />
            </a>
        ))}
    </aside>
);

@connect(state=>({
    Lang: state.Lang
}))
export default class Footer extends Component{

    render(){
        return (
            <footer id={CSS.Section}>
                <div className={CSS.Container}>
                    <div className={CSS.Info}>
                        <ul>
                            <Translate component="li" content="home.section.footer.about.title" />
                            <Translate component="li" content="home.section.footer.about.description" />
                            <li>
                                <i className="icon-mail" />
                                <a href="mailto:support@instak.me">support@instak.me</a>
                            </li>
                        </ul>
                        {map(infoItems, (items, name)=>(
                            <Aside key={name} {...{items, name}} />
                        ))}
                    </div>
                    <div className={CSS.Shares}>
                        <aside className={CSS.SharesOther}>
                            <div className={CSS.SharesOtherMoney}>
                                {map(moneyItems, name=>(
                                    <span key={name} style={{
                                        backgroundImage: `url("${source[name]}")`
                                    }}/>
                                ))}
                            </div>
                            <button>
                                <Lazy height={24}>
                                    <img src={flag[this.props.Lang]} alt="current lang" />
                                </Lazy>
                                <Translate content="langName" />
                            </button>
                        </aside>
                        <aside className={CSS.SharesSocials}>
                            <Translate component="h6" content="home.section.footer.socials.title" />
                            <div>
                                {map(socialItems, (value, name)=>(
                                    <a href={value} target="_blank" key={name}>
                                        <Lazy height={25}>
                                            <img src={source[name]} alt={value} />
                                        </Lazy>
                                    </a>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </footer>
        )
    }

}
