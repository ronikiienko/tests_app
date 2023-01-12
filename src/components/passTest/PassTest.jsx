import React from 'react';
import {
    PASS_TAB_KEY,
    PASS_TABS_MAP,
    TEST_GENERAL_KEYS,
    TEST_IN_PROCESS_ANSWERS_KEY,
    TEST_IN_PROCESS_CONFIGS_KEY,
    TEST_KEYS,
} from '../../consts.js';
import defaultTestConfigs from '../../defaultTestConfigs.js';
import {usePassTest} from '../../hooks/usePassTest.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {getItemFromStorage, parseJSON, setItemToStorage, validateTest} from '../../utils.js';

import './PassTest.css';
import {QuestionMemoized} from './Question.jsx';
import {Results} from './Results.jsx';


export default function PassTest() {
    const [passTab, setPassTab] = React.useState(getItemFromStorage(PASS_TAB_KEY) || PASS_TABS_MAP.passInProcess);
    const [testConfigs, setTestConfigs] = React.useState(getItemFromStorage(TEST_IN_PROCESS_CONFIGS_KEY, true) || {...defaultTestConfigs});
    const {
        answers,
        setAnswers,
        updateAnswer,
    } = usePassTest(getItemFromStorage(TEST_IN_PROCESS_ANSWERS_KEY) || [], testConfigs);
    const questionElements = testConfigs[TEST_KEYS.questions].map((question, index) => {
        return (
            <QuestionMemoized
                key={index}
                questionData={question}
                questionIndex={index}
                answer={answers?.[index]}
                updateAnswer={updateAnswer}
            />
        );
    });
    React.useEffect(() => {
        setItemToStorage(TEST_IN_PROCESS_CONFIGS_KEY, testConfigs, true);
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

    if (!testConfigs) return null;
    async function handleUserFile() {
        try {
            let [fileHandle] = await window.showOpenFilePicker();
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();
            let testConfigObject = parseJSON(text, true);
            if (!testConfigObject) return alert('Invalid test file :(');
            const isTestValid = validateTest(testConfigObject);
            if (!isTestValid) return alert('Invalid test file :(');
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
                <h1 className="test-name">{testConfigs[TEST_KEYS.general]?.[TEST_GENERAL_KEYS.testName]}</h1>
                <p className="test-description">{testConfigs[TEST_KEYS.general]?.[TEST_GENERAL_KEYS.testDescription]}</p>
            </header>
            {passTab === PASS_TABS_MAP.passFinished && <Results answers={answers} testConfigs={testConfigs}/>}
            {passTab === PASS_TABS_MAP.passInProcess && (
                <>{questionElements}</>
            )
            }
            <Button
                style={{display: 'block', margin: 'auto', width: '100%'}}
                onClick={passTab === PASS_TABS_MAP.passInProcess ? finishTest : startTest}>{passTab === PASS_TABS_MAP.passInProcess ? 'Finish test' : 'Restart test'}
            </Button>
        </div>
    );
}