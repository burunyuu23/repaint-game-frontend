import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    time: number
}

const SecondsPanel = ({time}: Props) => {
    return (
        <div>{Math.floor(time / 1000)}:{time % 1000}s</div>
    );
};

SecondsPanel.propTypes = {

};

export default SecondsPanel;