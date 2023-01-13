import React from 'react';
import './CloseButton.css';


export const CloseButton = ({onClick, children, style, title}) => {
    return (
        <button title={title} style={style} onClick={onClick} className="custom-close-button">{children}</button>
    );
};