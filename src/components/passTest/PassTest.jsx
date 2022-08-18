import {Button} from '@mui/material';
import React from 'react';
import defaultTestConfigs from '../../defaultTestConfigs.js';

import Header from './Header.jsx';
import Question from './Question.jsx';
import Results from './Results.jsx';


export default function PassTest({disabled}) {
    const [marks, setMarks] = React.useState(['']);
    const [isInProcess, setIsInProcess] = React.useState(!disabled);
    const [testConfigs, setTestConfigs] = React.useState({...defaultTestConfigs});
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <Question key={index} questionData={question} questionIndex={index} setMarks={setMarks}
                      isInProcess={isInProcess}/>
        );
    });

    function finishTest() {
        setIsInProcess(false);
        scroll(0,0);
    }

    function startTest() {
        setIsInProcess(true);
        scroll(0,0);
    }

    async function handleUserFile() {
        let [fileHandle] = await window.showOpenFilePicker();
        let fileData = await fileHandle.getFile();
        let text = await fileData.text();
        let testConfigObject = JSON.parse(text);
        console.log(testConfigObject);
        setTestConfigs(testConfigObject);
    }

    return (
        <>
            {!isInProcess && <Results marks={marks} testConfigs={testConfigs}/>}
            <Header testConfigs={testConfigs}/>
            {questionElements}
            {!disabled &&
                <Button
                    color='success'
                    variant={'outlined'}
                    onClick={isInProcess ? finishTest : startTest}
                    sx={{display: 'block', m: 'auto', width: 300, mb: 2}}
                >
                    {isInProcess ? 'Finish test' : 'Restart test'}
                </Button>}
            <Button
                variant={'outlined'}
                sx={{display: 'block', m: 'auto', width: 300, mb: 4}}
                onClick={handleUserFile}
            >
                Import test
            </Button>
        </>
    );
}