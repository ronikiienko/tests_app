import React from 'react';
import {TEST_IN_PROCESS_ANSWERS_KEY, TEST_IN_PROCESS_CONFIGS_KEY} from '../../consts.js';
import defaultTestConfigs from '../../defaultTestConfigs.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {JSONParseCatch} from '../../utils.js';

import './PassTest.css';
import {QuestionMemoized} from './Question.jsx';
import {Results} from './Results.jsx';


export default function PassTest() {
    const [answers, setAnswers] = React.useState([]);
    const [isInProcess, setIsInProcess] = React.useState(true);
    const [testConfigs, setTestConfigs] = React.useState(JSONParseCatch(window.localStorage.getItem(TEST_IN_PROCESS_CONFIGS_KEY)) || {...defaultTestConfigs});
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <QuestionMemoized key={index} questionData={question} questionIndex={index} answers={answers}
                              setAnswers={setAnswers}/>
        );
    });
    React.useEffect(() => {
        setAnswers(JSON.parse(window.localStorage.getItem(TEST_IN_PROCESS_ANSWERS_KEY)) || []);
        window.localStorage.setItem(TEST_IN_PROCESS_CONFIGS_KEY, JSON.stringify(testConfigs));
    }, [testConfigs]);

    React.useEffect(() => {
        window.localStorage.setItem(TEST_IN_PROCESS_ANSWERS_KEY, JSON.stringify(answers));
    }, [answers]);

    function finishTest() {
        setIsInProcess(false);
    }

    function startTest() {
        setAnswers([]);
        setIsInProcess(true);
    }

    async function handleUserFile() {
        try {
            let [fileHandle] = await window.showOpenFilePicker();
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();
            let testConfigObject = JSON.parse(text);
            setTestConfigs(testConfigObject);
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
            {!isInProcess && <Results answers={answers} testConfigs={testConfigs}/>}
            {isInProcess && (
                <>{questionElements}</>
            )
            }
            <Button
                style={{width: '100%'}}
                onClick={isInProcess ? finishTest : startTest}>{isInProcess ? 'Finish test' : 'Restart test'}
            </Button>
        </div>
    );
}