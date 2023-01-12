import React from 'react';
import {TEST_GENERAL_KEYS, TEST_GENERAL_RESULT_RANGE_KEYS} from '../../consts.js';
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
            <Button onClick={toggleResultRange}>Add result range</Button>
            {testGeneralData[TEST_GENERAL_KEYS.results]?.map((resultRange, index) => {
                return (
                    <div key={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.id]}>
                        <Input
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
                            type="number"
                            onChange={(event) => updateResultRangeProperty({
                                propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.max,
                                newValue: event.target.value,
                                resultRangeIndex: index,
                            })}
                            value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.max]}
                            label="Max:"
                        />
                        <Input
                            onChange={(event) => updateResultRangeProperty({
                                propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.resultName,
                                newValue: event.target.value,
                                resultRangeIndex: index,
                            })}
                            value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.resultName]}
                            label="Result name:"
                        />
                        <Input
                            onChange={(event) => updateResultRangeProperty({
                                propertyName: TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription,
                                newValue: event.target.value,
                                resultRangeIndex: index,
                            })}
                            value={resultRange[TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]}
                            label="Result description:"
                        />
                        <Button onClick={() => toggleResultRange({resultRangeIndex: index})}>Remove result
                            range</Button>
                    </div>
                );
            })}
        </div>
    );
};