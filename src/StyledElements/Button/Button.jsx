import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';


export const Button = ({onClick, children, style, title}) => {
    return (
        <button className="custom-button" title={title} style={style} onClick={onClick}>{children}</button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.object,
    title: PropTypes.string,
};