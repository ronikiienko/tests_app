import React from 'react';

import Header from './Header.jsx';
import Question from './Question.jsx';
import Results from './Results.jsx';


export default function PassTest({testConfigs, disabled}) {
    const [marks, setMarks] = React.useState(['']);
    const [isInProcess, setIsInProcess] = React.useState(!disabled);

    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <Question key={index} questionData={question} questionIndex={index} setMarks={setMarks}
                      isInProcess={isInProcess}/>
        );
    });

    function finishTest() {
        setIsInProcess(false);
    }

    function startTest() {
        setIsInProcess(true);
    }

    return (
        <>
            {!isInProcess && <Results marks={marks} testConfigs={testConfigs}/>}
            <Header testConfigs={testConfigs}/>
            {questionElements}
            {!disabled && <button
                onClick={isInProcess ? finishTest : startTest}>{isInProcess ? 'Finish test' : 'Restart test'}
            </button>}
        </>
    );
}