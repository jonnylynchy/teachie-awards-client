import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

const ContentContainer = ({ className, children }) => (
    <Container className={`${className} mx-auto p-5 border border-primary rounded`}>
        <Row>
            <Col>{children}</Col>
        </Row>
    </Container>
);

ContentContainer.propTypes = {
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

const StyledContainer = styled(ContentContainer)`
    background-color: #fff;
    margin-top: 3em;
    z-index: 1001;
    position: relative;
`;

export default StyledContainer;
