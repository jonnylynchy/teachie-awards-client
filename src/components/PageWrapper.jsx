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
