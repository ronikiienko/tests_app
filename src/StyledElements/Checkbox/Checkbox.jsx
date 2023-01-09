import PropTypes from 'prop-types';
import React from 'react';
import './Checkbox.css';


export const Checkbox = ({onChange, id, checked = false, label, disabled, readOnly}) => {
    return (
        <div className="checkbox-container">
            <input
                readOnly={Boolean(readOnly)}
                disabled={disabled}
                id={id} className="checkbox-input"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <label className="checkbox-label" htmlFor={id}>{label}</label>
        </div>
    );
};

Checkbox.propTypes = {
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
    checked: PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};