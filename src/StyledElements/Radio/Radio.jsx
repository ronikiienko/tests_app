import PropTypes from 'prop-types';
import React from 'react';
import './Radio.css';


export const Radio = ({value, onChange, id, checked, name, label, disabled, readOnly}) => {
    return (
        <div className="radio-container">
            <input readOnly={Boolean(readOnly)} value={value} disabled={disabled} id={id} className="radio-input"
                   type="radio" checked={checked}
                   onChange={onChange} name={name.toString()}/>
            <label className="radio-label" htmlFor={id}>{label}</label>
        </div>
    );
};

Radio.propTypes = {
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    id: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
};