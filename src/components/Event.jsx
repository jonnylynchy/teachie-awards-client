import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

import dateFormat from '../utils/date';

const Event = props => {
    const {
        event: { name, startDate, endDate }
    } = props;
    return (
        <Col>
            <Card body>
                <CardTitle>
                    <strong>{name}</strong>
                </CardTitle>
                <CardText>
                    This event runs from {dateFormat(startDate)} through {dateFormat(endDate)}
                </CardText>
                <Button color="primary">View Details</Button>
            </Card>
        </Col>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
    }).isRequired
};

export default Event;
