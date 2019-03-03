import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';

const styles = {
    backgroundColor: '#fff'
};

const PageWrapper = props => {
    const { title, children } = props;
    return (
        <Container style={styles}>
            <Row>
                <Col>
                    <h1>{title}</h1>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

PageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default PageWrapper;
