import {saveAs} from 'file-saver';
import React from 'react';
import {TEST_GENERAL_KEYS, TEST_KEYS} from '../../consts.js';
import {useCreateTest} from '../../hooks/useCreateTest.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {stringifyJSON} from '../../utils.js';
import {CreateGeneral} from './CreateGeneral.jsx';
import {CreateQuestions} from './CreateQuestions.jsx';


export default function CreateTest() {
    const {
        updateResultRangeProperty,
        updateGeneralProperty,
        toggleResultRange,
        updateQuestionAnswerProperty,
        toggleQuestionAnswer,
        updateQuestionProperty,
        setTestConfigs,
        toggleQuestion,
        testConfigs,
    } = useCreateTest();

    console.log(testConfigs);
    function exportTest() {
        console.log();
        let blob = new Blob([stringifyJSON(testConfigs, true)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.testName]}.txt`);
    }

    return (
        <div className="create-test-container">
            <CreateGeneral
                testGeneralData={testConfigs[TEST_KEYS.general]}
                toggleResultRange={toggleResultRange}
                updateGeneralProperty={updateGeneralProperty}
                updateResultRangeProperty={updateResultRangeProperty}
            />
            <CreateQuestions
                testQuestionsData={testConfigs[TEST_KEYS.questions]}
                toggleQuestion={toggleQuestion}
                updateQuestionAnswerProperty={updateQuestionAnswerProperty}
                toggleQuestionAnswer={toggleQuestionAnswer}
                updateQuestionProperty={updateQuestionProperty}
            />
            <Button onClick={toggleQuestion}>Create question</Button>
            <Button onClick={exportTest}>Export test</Button>
        </div>

    );
}