import React from 'react';
import {TEST_GENERAL_KEYS, TEST_GENERAL_RESULT_RANGE_KEYS} from '../../consts.js';
import {AddItemButton} from '../../StyledElements/AddItemButton/AddItemButton.jsx';
import {Button} from '../../StyledElements/Button/Button.jsx';
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
            {testGeneralData[TEST_GENERAL_KEYS.results]?.map((resultRange, index) => {
                return (
                    <div className="create-result-range-container" key={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.id]}>
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
                        <Button
                            onClick={() => toggleResultRange({resultRangeIndex: index})}
                        >
                            Remove result range
                        </Button>
                    </div>
                );
            })}
            <AddItemButton
                style={{
                    minWidth: '60%',
                    width: 'fit-content',
                    marginInline: 'auto',
                    paddingInline: '10px',
                }}
                onClick={toggleResultRange}
            >
                Add result range
            </AddItemButton>
        </div>
    );
};