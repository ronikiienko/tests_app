import {saveAs} from 'file-saver';
import React from 'react';
import {TEST_GENERAL_KEYS, TEST_KEYS} from '../../consts.js';
import {useCreateTest} from '../../hooks/useCreateTest.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import {stringifyJSON} from '../../utils.js';
import CreateQuestion from './CreateQuestion.jsx';


export default function CreateTest() {
    const {
        updateResultRangeProperty,
        updateGeneralProperty,
        addResultRange,
        updateQuestionAnswerProperty,
        addQuestionAnswer,
        updateQuestionProperty,
        setTestConfigs,
        addQuestion,
        testConfigs,
    } = useCreateTest();

    function exportTest() {
        console.log();
        let blob = new Blob([stringifyJSON(testConfigs, true)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.testName]}.txt`);
    }

    let questionElements = testConfigs[TEST_KEYS.questions].map((questionData, index) => {
        return (
            <CreateQuestion
                key={index}
                questionIndex={index}
                questionData={questionData}
                updateQuestionAnswerProperty={updateQuestionAnswerProperty}
                addQuestionAnswer={addQuestionAnswer}
                updateQuestionProperty={updateQuestionProperty}
            />
        );
    });

    return (
        <div>
            <span>Test name: </span>
            <Input
                value={testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.testName]}
                onChange={(event) => {
                    updateGeneralProperty({propertyName: TEST_GENERAL_KEYS.testName, newValue: event.target.value});
                }}
            />
            <br/>
            <span>Test description: </span>
            <br/>
            <Input
                value={testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.testDescription]}
                onChange={(event) => {
                    updateGeneralProperty({propertyName: TEST_GENERAL_KEYS.testName, newValue: event.target.value});
                }}
            />
            <br/>
            <Button onClick={addQuestion}>Create question</Button>
            {questionElements}
            {/*<CreateResults setGeneral={setGeneral} saveSignal={saveSignal} editSignal={editSignal}*/}
            {/*               testConfigObject={testConfigObject}/>*/}
            <br/>
            <Button onClick={exportTest}>Export test</Button>
        </div>

    );
}