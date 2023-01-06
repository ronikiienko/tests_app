import PropTypes from 'prop-types';
import React from 'react';
import './Link.css';


export const Link = ({href, text, className}) => {
    return (
        <a className={`link ${className}`} href={href}>{text}</a>
    );
};

Link.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    text: PropTypes.string,
};
