import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

import dateFormat from '../utils/date';

const Event = props => {
    const {
        event: { eventId, name, startDate, endDate }
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
                <Button color="primary" tag={Link} to={`/events/detail/${eventId}`}>
                    View Details
                </Button>
            </Card>
        </Col>
    );
};

Event.propTypes = {
    event: PropTypes.shape({
        eventId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
    }).isRequired
};

export default Event;
