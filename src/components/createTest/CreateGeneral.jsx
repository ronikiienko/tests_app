import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {TEST_GENERAL_KEYS, TEST_GENERAL_RESULT_RANGE_KEYS} from '../../consts.js';
import {AddItemButton} from '../../StyledElements/AddItemButton/AddItemButton.jsx';
import {CloseButton} from '../../StyledElements/CloseButton/CloseButton.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import './CreateGeneral.css';


export const CreateGeneral = ({
                                  testGeneralData,
                                  updateGeneralProperty,
                                  updateResultRangeProperty,
                                  toggleResultRange,
                              }) => {
    return (
        <div className="create-general-container">
            <h2>General test configs:</h2>
            <span>Test name: </span>
            <Input
                value={testGeneralData[TEST_GENERAL_KEYS.testName]}
                onChange={(event) => {
                    updateGeneralProperty({propertyName: TEST_GENERAL_KEYS.testName, newValue: event.target.value});
                }}
            />
            <br/>
            <span>Test description: </span>
            <br/>
            <Input
                value={testGeneralData[TEST_GENERAL_KEYS.testDescription]}
                onChange={(event) => {
                    updateGeneralProperty({
                        propertyName: TEST_GENERAL_KEYS.testDescription,
                        newValue: event.target.value,
                    });
                }}
            />
            <br/>
            <TransitionGroup component="div">
                {testGeneralData[TEST_GENERAL_KEYS.results]?.map((resultRange, index) => (
                    <CSSTransition
                        key={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.id]}
                        timeout={200}
                        classNames="create-result-range-appear"
                    >
                        <div
                            className="create-result-range-container"
                            key={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.id]}
                        >
                            <div>
                                <div className="create-result-range-minmax">
                                    <Input
                                        className="input-small"
                                        type="number"
                                        onChange={(event) => updateResultRangeProperty({
                                            propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.min,
                                            newValue: event.target.value,
                                            resultRangeIndex: index,
                                        })}
                                        value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.min]}
                                        label="Min:"
                                    />
                                    <Input
                                        className="input-small"
                                        type="number"
                                        onChange={(event) => updateResultRangeProperty({
                                            propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.max,
                                            newValue: event.target.value,
                                            resultRangeIndex: index,
                                        })}
                                        value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.max]}
                                        label="Max:"
                                    />
                                </div>
                                <div className="create-result-range-name-desc">
                                    <Input
                                        onChange={(event) => updateResultRangeProperty({
                                            propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.resultName,
                                            newValue: event.target.value,
                                            resultRangeIndex: index,
                                        })}
                                        value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.resultName]}
                                        label="Result name:"
                                    />
                                    <br/>
                                    <Input
                                        onChange={(event) => updateResultRangeProperty({
                                            propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription,
                                            newValue: event.target.value,
                                            resultRangeIndex: index,
                                        })}
                                        value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]}
                                        label="Result description:"
                                    />
                                </div>
                            </div>
                            <CloseButton
                                style={{
                                    fontSize: '30px',
                                    width: '50px',
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    height: '100%',
                                    borderBottomLeftRadius: 0,
                                    borderTopLeftRadius: 0,
                                }}
                                onClick={() => toggleResultRange({resultRangeIndex: index})}
                            >
                                -
                            </CloseButton>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <AddItemButton
                style={{
                    minWidth: '80%',
                    width: 'fit-content',
                    marginTop: '20px',
                    marginInline: 'auto',
                    paddingInline: '10px',
                    fontSize: '30px',
                }}
                onClick={toggleResultRange}
            >
                Add result range
            </AddItemButton>
        </div>
    );
};