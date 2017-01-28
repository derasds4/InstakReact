import CSS from './index.less'
import map from 'lodash/map'
import * as source from './source'
import {Element} from 'react-scroll'

export default ()=>(
    <Element name="Home-top" id={CSS.Section} style={{
        backgroundImage: `url("${source.background}")`
    }}>
        <div className={CSS.Container}>
            <aside className={CSS.TopContent}>
                <div className={CSS.Content}>
                    <Translate component="h1" content="home.section.top.TopContent.title" />
                    <div className={CSS.Description}>
                        <Translate content="home.section.top.TopContent.description" />
                    </div>
                    <button data-window="create">
                        <Translate content="home.section.top.TopContent.button" />
                    </button>
                </div>
                <div className={CSS.VideoContent}>
                    <div className={CSS.macbook}>
                        <img src={source.macbook} alt="macbook" />
                        <div className={CSS.play} style={{
                            backgroundImage: `url("${source.play}")`
                        }}></div>
                        <div className={CSS.watch}>
                            <Translate content="home.section.top.VideoContent.watch" />
                        </div>
                    </div>
                </div>
            </aside>
            <aside className={CSS.WhoContent}>
                <Translate component="h2" content="home.section.top.WhoContent.title" />
                <div className={CSS.ul}>
                    {map([
                        [0,1,2,3],
                        [0,1,2,3],
                        [0,1,2,3]
                    ],(value, key)=>(
                        <ul key={key}>
                            {map(value, index=>(
                                <Translate key={index} content={"home.section.top.WhoContent.list." + key + "." + "." +index} component="li" />
                            ))}
                        </ul>
                    ))}
                </div>
            </aside>
        </div>
    </Element>
)