import React from 'react';
import testConfigs from './../testConfig.js';
import Header from './Header.jsx';
import Question from './Question.jsx';
import Results from './Results.jsx';


export const MarksContext = React.createContext();

export default function App() {

    const [marks, setMarks] = React.useState(Array(testConfigs.questions.length).join('.').split('.'));
    const [isInProcess, setIsInProcess] = React.useState(true);

    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <Question key={index} questionData={question} inputsName={index} questionIndex={index} setMarks={setMarks} isInProcess={isInProcess} />
        );
    });
    function finishTest () {
        setIsInProcess(false)
    }
    function startTest () {
        setIsInProcess(true)
    }

    return (
        <>
            <MarksContext.Provider value={setMarks}>
                <Header testConfigs={testConfigs}/>
                {questionElements}
                {isInProcess === false && <Results marks={marks} testConfigs={testConfigs}/>}
                <button onClick={isInProcess ? finishTest : startTest}>{isInProcess ? 'Finish test' : 'Restart test'}</button>
            </MarksContext.Provider>

        </>
    );
}