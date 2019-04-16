import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Card, Button, CardTitle, CardText, Col } from 'reactstrap';

import GlobalContext from '../context/GlobalContext';
import api from '../utils/API';
import PageWrapper from '../components/PageWrapper';
import dateFormat from '../utils/date';

const EventDetail = props => {
    const [event, setEvent] = useState({ name: '' });
    const globalContext = useContext(GlobalContext);
    const { updateLoading, auth } = globalContext;

    const {
        match: {
            params: { id }
        }
    } = props;

    const getEvent = async path => {
        updateLoading(true);
        const response = await api.get(path);
        updateLoading(false);
        return response;
    };

    useEffect(() => {
        if (event.name === '') {
            getEvent(`/events/${id}`).then(response => {
                setEvent(response.data);
            });
        }
    }, [event]);

    return (
        <PageWrapper title={event && event.name}>
            <div>
                {event && event.name ? (
                    <div>
                        <strong>{event.name}</strong>
                        <p>
                            This event runs from {dateFormat(event.startDate)} through {dateFormat(event.endDate)}
                        </p>
                        {auth && auth.accessToken ? <Button color="primary">Vote</Button> : <div>Sign in to vote</div>}
                    </div>
                ) : null}
            </div>
        </PageWrapper>
    );
};

EventDetail.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default withRouter(props => <EventDetail {...props} />);
