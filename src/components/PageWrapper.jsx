/**
 * This component just wraps a component and
 * returns a container with a title and children
 */
import React from 'react';
import PropTypes from 'prop-types';

import StyledContainer from './StyledContainer';

const PageWrapper = props => {
    const { title, children } = props;
    return (
        <StyledContainer>
            <h1>{title}</h1>
            {children}
        </StyledContainer>
    );
};

PageWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default PageWrapper;
