import React from 'react';
import defaultTestConfigs from '../../defaultTestConfigs.js';

import Header from './Header.jsx';
import {QuestionMemoized} from './Question.jsx';


export default function PassTest({disabled}) {
    const [answers, setAnswers] = React.useState([]);
    console.log(answers);
    const [isInProcess, setIsInProcess] = React.useState(!disabled);
    const [testConfigs, setTestConfigs] = React.useState({...defaultTestConfigs});
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <QuestionMemoized key={index} questionData={question} questionIndex={index} answers={answers}
                              setAnswers={setAnswers}
                              isInProcess={isInProcess}/>
        );
    });

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