import PropTypes from 'prop-types';
import './Input.css';


export const Input = ({value, onChange, label, type = 'text', readOnly = false}) => {
    return (
        <label className="text-input-label">
            {label}
            <input readOnly={readOnly} type={type} className="text-input" value={value || ''}
                   onChange={onChange}/>
        </label>
    );
};

Input.propTypes = {
    readOnly: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    label: PropTypes.string,
};