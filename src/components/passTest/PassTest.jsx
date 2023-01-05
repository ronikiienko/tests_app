import React from 'react';
import {TEST_IN_PROCESS_ANSWERS_KEY, TEST_IN_PROCESS_CONFIGS_KEY} from '../../consts.js';
import defaultTestConfigs from '../../defaultTestConfigs.js';

import Header from './Header.jsx';
import {QuestionMemoized} from './Question.jsx';


export default function PassTest({disabled}) {
    const [answers, setAnswers] = React.useState([]);
    const [isInProcess, setIsInProcess] = React.useState(!disabled);
    const [testConfigs, setTestConfigs] = React.useState({...defaultTestConfigs});
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
        console.log(answers);
        window.localStorage.setItem(TEST_IN_PROCESS_ANSWERS_KEY, JSON.stringify(answers));
    }, [answers]);

    function finishTest() {
        setIsInProcess(false);
    }

    function startTest() {
        setIsInProcess(true);
    }

    async function handleUserFile() {
        try {
            let [fileHandle] = await window.showOpenFilePicker();
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();
            let testConfigObject = JSON.parse(text);
            console.log(testConfigObject);
            setTestConfigs(testConfigObject);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <button onClick={handleUserFile}>Import test</button>
            {/*{!isInProcess && <Results marks={marks} testConfigs={testConfigs}/>}*/}
            <Header testConfigs={testConfigs}/>
            {questionElements}
            {!disabled && <button
                onClick={isInProcess ? finishTest : startTest}>{isInProcess ? 'Finish test' : 'Restart test'}
            </button>}
        </>
    );
}