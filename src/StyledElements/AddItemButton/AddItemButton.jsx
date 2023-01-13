import PropTypes from 'prop-types';
import React from 'react';
import './AddItemButton.css';


export const AddItemButton = ({onClick, children, style, title}) => {
    return (
        <button className="custom-additem-button" title={title} style={style} onClick={onClick}>{children}</button>
    );
};

AddItemButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any,
    style: PropTypes.object,
    title: PropTypes.string,
};