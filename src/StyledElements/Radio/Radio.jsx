import PropTypes from 'prop-types';
import React from 'react';
import './Radio.css';


export const Radio = ({value, onChange, id, checked, name, label, disabled}) => {
    return (
        <div className="radio-container">
            <input value={value} disabled={disabled} id={id} className="radio-input" type="radio" checked={checked}
                   onChange={onChange} name={name}/>
            <label className="radio-label" htmlFor={id}>{label}</label>
        </div>
    );
};

Radio.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    id: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};