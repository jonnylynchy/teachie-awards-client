/**
 * This is the loader component that will appear when data is fetching
 */
import React from 'react';
import ScaleLoader from '@bit/davidhu2000.react-spinners.scale-loader';

const ContainerStyles = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
};

const AlignerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const alignerItemStyles = {
    maxWidth: '50%',
    width: '200px'
};

const Loader = () => (
    <div style={ContainerStyles}>
        <div style={AlignerStyles}>
            <div style={alignerItemStyles}>
                <ScaleLoader height={90} width={10} color="#6b5ce7" />
            </div>
        </div>
    </div>
);

export default Loader;
