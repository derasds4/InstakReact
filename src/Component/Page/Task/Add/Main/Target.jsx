import {Row, Col} from 'react-grid-system'
import {Component} from 'react'
import {AutoComplete} from '../components'
import {account, hashtag} from '../items'
import {verify} from '../verify'

const AccountField = props=>(
    <AutoComplete {...props} name="account" item={account} />
);
const HashtagField = props=>(
    <AutoComplete {...props} name="hashtag" item={hashtag} />
);

const fullWidth = {width: '100%'};

const CurrentField = props=>{
    const {data} = props;
    if(verify(data, account)){
        return <AccountField {...props} style={fullWidth} />
    }
    if(verify(data, hashtag)){
        return <HashtagField {...props} style={fullWidth} />
    }
    return null;
};

const MainType = props=>(
    <Row>
        <Col>
            <Translate component="h3" content="pages.task.add.section.main.target" />
        </Col>
        <Col md={6}>
            <CurrentField {...props} />
        </Col>
        <Col md={6}>

        </Col>
    </Row>
);

export default MainType