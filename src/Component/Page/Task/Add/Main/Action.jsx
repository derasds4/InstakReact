import {Row, Col} from 'react-grid-system'
import {Component} from 'react'
import {Select} from '../components'
import {type, sourceType} from '../items'

const MainAction = props=>(
    <Row>
        <Col>
            <Translate component="h3" content="pages.task.add.section.main.action" />
        </Col>
        <Col md={6}>
            <Select {...props} name="type" item={type}/>
        </Col>
        <Col md={6}>
            <Select {...props} name="sourceType" item={sourceType}/>
        </Col>
    </Row>
);

export default MainAction