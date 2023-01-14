import PropTypes from 'prop-types';
import React from 'react';
import './FileButton.css';


export const FileButton = ({onChange, style, title, id, children}) => {
    return (
        <>
            <input accept="text/plain" type="file" id={id} className="custom-file-button-hidden-input"
                   onChange={onChange}/>
            <label style={style} className="custom-file-button" title={title} htmlFor={id}>{children}</label>
        </>

    );
};

FileButton.propTypes = {
    onChange: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};