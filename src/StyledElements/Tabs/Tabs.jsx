import PropTypes from 'prop-types';
import React from 'react';
import './Tabs.css';


export const Tabs = ({openedTab, setOpenedTab, tabsArray}) => {
    const handleClick = (event) => {
        setOpenedTab(event.target.id);
    };
    return (
        <div onClick={handleClick}>
            {tabsArray.map(tab => {
                return (
                    <div className={openedTab === tab.id ? 'selected-tab' : ''} id={tab.id}>{tab.label}</div>
                );
            })}
        </div>
    );
};

Tabs.propTypes = {
    tabsArray: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
    openedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setOpenedTab: PropTypes.func,
};