import PropTypes from 'prop-types';
import React from 'react';
import './Input.css';


export const Input = ({value, onChange, label, type}) => {
    console.log(type);
    return (
        <label className="text-input-label">
            {label}
            <input type={type || 'text'} className="text-input" value={value} onChange={onChange}/>
        </label>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
};