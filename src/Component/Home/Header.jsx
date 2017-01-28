import style from './style/Header.less'
import Lazy from 'react-lazyload'
import logo from './source/logo.svg'
import {Component} from 'react'
import * as flag from '../../source/flag'
import map from 'lodash/map'
import * as langs from '../../config/lang'
import {Motion, spring} from 'react-motion'
import {connect} from 'react-redux'
import {set as setLanguage} from '../../Store/Action/Lang'
import {Link} from 'react-scroll'

const FadeIn = ({children})=>(
    <Motion defaultStyle={{value: 0}} style={{value: spring(1)}}>
        {
            ({value})=>children(value)
        }
    </Motion>
);

const Logo = ()=>(
    <div className={style.Logo}>
        <Lazy height={28}>
            <img className={style.LogoIcon} alt="Instak logo" src={logo} />
        </Lazy>
        <div className={style.LogoTitle}>INSTAK</div>
    </div>
);
const NavLink = ({ name })=>(
    <Link to={"Home-" + name} activeClass="active" spy={true} smooth={true} duration={250} href={"#section-" + name}>
        <Translate content={"home.section." + name + ".navTitle"} component="span" />
    </Link>
);

const Links = ()=>(
    <nav className={style.Nav}>
        {
            ['top', 'our', 'replies', 'prices'].map(name=>(
                <NavLink name={name} key={name} />
            ))
        }
    </nav>
);

const Buttons = ({ langSelectState, closeLangSelect, openLangSelect, setLanguage })=>(
    <div className={style.Buttons}>
        {langSelectState
            ? <LangSelect select={key=>{
                closeLangSelect(key);
                setLanguage(key);
            }} />
            : <button className={style.ButtonLang} onClick={openLangSelect}>
            <Lazy height={24}>
                <img src={flag[counterpart.getLocale()]} alt="current lang" />
            </Lazy>
        </button>
        }
        <button className={style.ButtonLogin}>
            <Translate content="home.window.login.title" />
        </button>
        <button className={style.ButtonSignup}>
            <Translate content="home.window.signup.title" />
        </button>
    </div>
);

const LangSelect = ({ select })=>(
    <FadeIn>
        {value=>(
            <div style={{opacity: value}} className={style.LangSelect}>
                {
                    map(langs, (value, key)=>(
                        <button key={key} onClick={()=>select(key)}>
                            <Lazy height={24}>
                                <img src={flag[key]} alt={key} />
                            </Lazy>
                        </button>
                    ))
                }
            </div>
        )}
    </FadeIn>
);

@connect(state=>({
    Language: state.Lang
}),{
    setLanguage
})
export default class Header extends Component{

    constructor(){
        super();
        this.state = {
            selectLangOpened: false
        };
    }

    openLangSelect(){
        this.setState({
            selectLangOpened: true
        })
    }

    closeLangSelect(){
        this.setState({
            selectLangOpened: false
        })
    }

    render(){
        return (
            <header className={style.Header}>
                <Logo />
                <Links />
                <Buttons
                    setLanguage={this::this.props.setLanguage}
                    langSelectState={this.state.selectLangOpened}
                    openLangSelect={this::this.openLangSelect}
                    closeLangSelect={this::this.closeLangSelect}
                />
            </header>
        )
    }

}