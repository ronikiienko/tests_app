import React from 'react';
import {PASS_TAB_KEY, PASS_TABS_MAP, TEST_IN_PROCESS_ANSWERS_KEY, TEST_IN_PROCESS_CONFIGS_KEY} from '../../consts.js';
import defaultTestConfigs from '../../defaultTestConfigs.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {getItemFromStorage, setItemToStorage} from '../../utils.js';

import './PassTest.css';
import {QuestionMemoized} from './Question.jsx';
import {Results} from './Results.jsx';


export default function PassTest() {
    const [answers, setAnswers] = React.useState(getItemFromStorage(TEST_IN_PROCESS_ANSWERS_KEY) || []);
    const [passTab, setPassTab] = React.useState(getItemFromStorage(PASS_TAB_KEY) || PASS_TABS_MAP.passInProcess);
    const [testConfigs, setTestConfigs] = React.useState(getItemFromStorage(TEST_IN_PROCESS_CONFIGS_KEY) || {...defaultTestConfigs});
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <QuestionMemoized key={index} questionData={question} questionIndex={index} answers={answers}
                              setAnswers={setAnswers}/>
        );
    });
    React.useEffect(() => {
        setItemToStorage(TEST_IN_PROCESS_CONFIGS_KEY, testConfigs);
    }, [testConfigs]);

    React.useEffect(() => {
        setItemToStorage(TEST_IN_PROCESS_ANSWERS_KEY, answers);
    }, [answers]);

    React.useEffect(() => {
        setItemToStorage(PASS_TAB_KEY, passTab);
    }, [passTab]);

    function finishTest() {
        setPassTab(PASS_TABS_MAP.passFinished);
    }

    function startTest() {
        setAnswers([]);
        setPassTab(PASS_TABS_MAP.passInProcess);
    }

    async function handleUserFile() {
        try {
            let [fileHandle] = await window.showOpenFilePicker();
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();
            let testConfigObject = JSON.parse(text);
            setTestConfigs(testConfigObject);
            setAnswers([]);
            setPassTab(PASS_TABS_MAP.passInProcess);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="pass-test-container">
            <Button style={{display: 'block', margin: 'auto', width: '70%'}} onClick={handleUserFile}>Import new
                test</Button>
            <header className="test-header">
                <h1 className="test-name">{testConfigs.general.testName}</h1>
                <p>{testConfigs.general.testDescription}</p>
            </header>
            {passTab === PASS_TABS_MAP.passFinished && <Results answers={answers} testConfigs={testConfigs}/>}
            {passTab === PASS_TABS_MAP.passInProcess && (
                <>{questionElements}</>
            )
            }
            <Button
                style={{width: '100%'}}
                onClick={passTab === PASS_TABS_MAP.passInProcess ? finishTest : startTest}>{passTab === PASS_TABS_MAP.passInProcess ? 'Finish test' : 'Restart test'}
            </Button>
        </div>
    );
}