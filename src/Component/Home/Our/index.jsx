import {Our, Container, OurContent, Item, Content} from './index.less'
import * as source from './source'
import map from 'lodash/map'
import Lazy from 'react-lazyload'
import {Motion, spring} from 'react-motion'
import {Element} from 'react-scroll'

const items = ['ease', 'live', 'mobile', 'speed', 'support', 'secure'];

export default ()=>(
    <Element name="Home-our" id={Our}>
        <div className={Container}>
            <Translate content="home.section.our.title" component="h2" />
            <div className={Content}>
                {map(items, name=>(
                    <div className={Item} key={name}>
                        <Lazy height={65}>
                            <Motion defaultStyle={{value: 0}} style={{value: spring(1)}}>
                                {({value})=><img style={{opacity: value}} src={source[name]} alt={name} />}
                            </Motion>
                        </Lazy>
                        <Translate content={"home.section.our.items." + name + ".title"} component="h4" />
                        <div className={OurContent}>
                            <Translate content={"home.section.our.items." + name + ".content"} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Element>
)