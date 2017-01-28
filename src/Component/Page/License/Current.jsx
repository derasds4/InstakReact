import {Row, Col} from 'react-grid-system'
import {formatDDMMYYY, addMonths} from '../../../utils/date'

const CurrentLicense = ({license})=> (
    <div>
        <Translate component="h3" content="pages.license.current.title" />
        <Row>
            <Col md={6}>
                <Translate content="pages.license.props.startedAt.title" />
                <span>: {formatDDMMYYY(license.startedAt)}</span>
            </Col>
            <Col md={6}>
                <Translate content="pages.license.props.expiresIn.title" />
                <span>: {formatDDMMYYY(addMonths(license.startedAt, license.months))}</span>
            </Col>
        </Row>
    </div>
);

export default CurrentLicense;