/**
 * This is the event detail page.
 */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';

import GlobalContext from '../context/GlobalContext';
import api from '../utils/API';
import PageWrapper from '../components/PageWrapper';
import dateFormat from '../utils/date';

const EventDetail = props => {
    const [event, setEvent] = useState({ name: '' });
    const [educators, setEducators] = useState([]);
    const [userVotesList, setUserVotesList] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const globalContext = useContext(GlobalContext);
    const { updateLoading, auth, user } = globalContext;

    const {
        match: {
            params: { id }
        }
    } = props;

    const getData = async path => {
        updateLoading(true);
        const response = await api.get(path);
        updateLoading(false);
        return response;
    };

    const updateEducators = () => {
        getData('/user/educators').then(response => {
            setEducators(response.data);
        });
    };

    useEffect(() => {
        if (event.name === '') {
            getData(`/events/${id}`).then(response => {
                setEvent(response.data);
            });
        }
        if (!educators.length) {
            updateEducators();
        }
        if (user && user.id && !userVotesList.length) {
            getData(`/user/votesByUser/${user.id}`).then(response => {
                response.data.forEach(vote => {
                    if (vote.event.eventId === parseInt(id, 0)) {
                        setHasVoted(true);
                    }
                });
                setUserVotesList(response.data);
            });
        }
    }, [event]);

    const voteForUser = educatorId => {
        getData(`/user/educator/vote?eventId=${id}&userId=${user.id}&educatorId=${educatorId}`).then(response => {
            setHasVoted(true);
            updateEducators();
        });
    };

    const VotingLink = props => {
        if (hasVoted) {
            return (
                <Button color="primary" disabled title="You've already voted in this event.">
                    Vote for {props.firstName}
                </Button>
            );
        }

        if (auth && auth.accessToken) {
            return (
                <Button color="primary" onClick={() => voteForUser(props.id)}>
                    Vote for {props.firstName}
                </Button>
            );
        }

        return <div>Sign in to vote</div>;
    };

    return (
        <PageWrapper title={event && event.name}>
            <div>
                {event && event.name ? (
                    <div>
                        <strong>{event.name}</strong>
                        <p>
                            This event runs from {dateFormat(event.startDate)} through {dateFormat(event.endDate)}
                        </p>
                        <div>
                            {educators.map(educator => (
                                <Row className="border-top" key={educator.id}>
                                    <Col xs="2" className="p-3">
                                        <i className="fas fa-user fa-5x" />
                                    </Col>
                                    <Col xs="10" md="7" className="p-3">
                                        <h4>
                                            {educator.firstName} {educator.lastName}{' '}
                                            <small>Votes: {educator.votes.length}</small>
                                        </h4>
                                        <p>{educator.firstName} has taught at this school for 15 years.</p>
                                    </Col>
                                    <Col xs="6" md="3" className="p-3">
                                        <VotingLink id={educator.id} firstName={educator.firstName} />
                                    </Col>
                                </Row>
                            ))}
                        </div>
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
