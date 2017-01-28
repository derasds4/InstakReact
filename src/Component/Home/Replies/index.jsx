import CSS from './index.less'
import range from 'lodash/range'
import map from 'lodash/map'
import * as replies from './replies'
import {Motion, spring} from 'react-motion'
import Lazy from 'react-lazyload'
import {Element} from 'react-scroll'

const repliesCount = 1;

export default ()=>(
    <Element name="Home-replies" id={CSS.Section}>
        <div className={CSS.Container}>
            <div className={CSS.Content}>
                <Translate component="h2" content="home.section.replies.title" />
                <div className={CSS.description}>
                    <Translate content="home.section.replies.description" />
                </div>
                <div className={CSS.Replies}>
                    {map(range(repliesCount), index=>(
                        <div className={CSS.Reply} key={index}>
                            <Lazy>
                                <Motion defaultStyle={{value: 0}} style={{value: spring(1)}}>
                                    {state=>(
                                        <img style={{opacity: state.value}} src={replies['reply' + index].avatar} alt="" />
                                    )}
                                </Motion>
                            </Lazy>
                            <div className={CSS.ReplyContent}>
                                <Translate component="h2" content={"home.section.replies.items." + index + ".title"} />
                                <div className={CSS.ReplyAbout}>
                                    <Translate content={"home.section.replies.items." + index + ".about"} />
                                </div>
                                <div className={CSS.ReplyBody}>
                                    <Translate content={"home.section.replies.items." + index + ".body"} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Element>
)