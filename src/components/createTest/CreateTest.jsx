import {saveAs} from 'file-saver';
import React from 'react';
import {TEST_GENERAL_KEYS, TEST_KEYS, USER_ID_KEY} from '../../consts.js';
import {useCreateTest} from '../../hooks/useCreateTest.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {CloseButton} from '../../StyledElements/CloseButton/CloseButton.jsx';
import {getItemFromStorage, parseJSON, stringifyJSON, validateTest} from '../../utils.js';
import {CreateGeneral} from './CreateGeneral.jsx';
import {CreateQuestions} from './CreateQuestions.jsx';
import './CreateTest.css';

// TODO show total maximum mark in creategeneral
// TODO check if when finished passing test resultName and description are right
export default function CreateTest() {
    const {
        updateResultRangeProperty,
        updateGeneralProperty,
        toggleResultRange,
        updateQuestionAnswerProperty,
        toggleQuestionAnswer,
        updateQuestionProperty,
        toggleQuestion,
        testConfigs,
        setTestConfigs,
        resetTestConfigs,
    } = useCreateTest();

    function exportTest() {
        let isTestValid = validateTest(testConfigs);
        if (!isTestValid) return alert('Some field is not filled :(');
        let blob = new Blob([stringifyJSON(testConfigs, true)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.testName]}.txt`);
    }

    async function openTestToEdit() {
        try {
            let [fileHandle] = await window.showOpenFilePicker();
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();
            let testConfigObject = parseJSON(text, true);
            if (!testConfigObject) return alert('Invalid test file :(');
            const isTestValid = validateTest(testConfigObject);
            if (testConfigObject[TEST_KEYS.general]?.[TEST_GENERAL_KEYS.creatorId] !== getItemFromStorage(USER_ID_KEY)) {
                return alert('Only test creator can edit test :(');
            }
            if (!isTestValid) return alert('Invalid test file :(');
            setTestConfigs(testConfigObject);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="create-test-container">
            <Button
                onClick={() => confirm('Are you sure? All current test data will be lost.') && openTestToEdit()}
                style={{width: '100%', display: 'block', margin: 'auto'}}
            >
                Edit existing test
            </Button>
            <CloseButton
                style={{width: '100%', display: 'block', marginInline: 'auto', marginTop: '20px'}}
                onClick={() => confirm('Are you sure? All current test data will be lost.') && resetTestConfigs()}
            >
                Reset test configs
            </CloseButton>
            <CreateGeneral
                testGeneralData={testConfigs?.[TEST_KEYS.general]}
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
            <Button
                style={{width: '100%', display: 'block', margin: 'auto'}}
                onClick={exportTest}
            >
                Export test
            </Button>
        </div>
    );
}