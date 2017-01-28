import {Component} from 'react'
import Container from '../../Container'
import Paper from 'material-ui/Paper'
import Highcharts from 'react-highcharts'
import {Row, Col} from 'react-grid-system'
import {setPage} from '../../../Store/Action/Application'
import {connect} from 'react-redux'

const paperStyle = {
    padding: 15
};
const config = {
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }]
};

@connect(null, {
    setPage
})
export default class HomePage extends Component{

    componentWillMount(){
        this.props.setPage('main');
    }

    render(){
        return (
            <Container>
                <h2>Графики</h2>
                <Row>
                    <Col style={paperStyle} lg={6}>
                        <Paper>
                            <Highcharts config={config} />
                        </Paper>
                    </Col>
                    <Col style={paperStyle} lg={6}>
                        <Paper>
                            <Highcharts config={config} />
                        </Paper>
                    </Col>
                </Row>
            </Container>
        )
    }

}