import PropTypes from 'prop-types';
import React from 'react';
import './FileButton.css';


export const FileButton = ({onChange, style, title, children}) => {
    return (
        <>
            <label style={style} className="custom-file-button" title={title}>
                {children}
                <input accept="text/plain" type="file" className="custom-file-button-hidden-input"
                       onClick={(event) => {
                           event.target.value = null;
                       }}
                       onChange={onChange}/>
            </label>
        </>

    );
};

FileButton.propTypes = {
    onChange: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
};