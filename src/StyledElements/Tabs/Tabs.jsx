import PropTypes from 'prop-types';
import React from 'react';
import './Tabs.css';


export const Tabs = ({
                         openedTab = 'default',
                         setOpenedTab = (tab) => console.log(tab),
                         tabsArray = [{id: 'default', label: 'default tab'}],
                     }) => {
    const handleClick = (event) => {
        setOpenedTab(event.target.id);
    };
    return (
        <div className="tabs-buttons-container" onClick={handleClick}>
            {tabsArray.map(tab => {
                return (
                    <span key={tab.id} className={`tab-button ${openedTab === tab.id && 'selected'}`}
                          id={tab.id}>{tab.label}</span>
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