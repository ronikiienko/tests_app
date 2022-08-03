import React from 'react';
import testConfigs from './../testConfig.js';
import Header from './Header.jsx';
import Questions from './Questions.jsx';


export const MarksContext = React.createContext();

export default function App() {
    const emptyMarksForTestLength = new Array(testConfigs.questions.length);

    const [marks, setMarks] = React.useState(emptyMarksForTestLength);


    console.log(marks);
    function setMark(questionIndex, mark) {
        console.log('hello')
        setMarks((prevMarks) => {
            let newMarks = prevMarks;
            newMarks[questionIndex] = questionIndex;
            return newMarks;
        });
    }

    return (
        <>
            <MarksContext.Provider value={setMark}>
                <Header testConfigs={testConfigs}/>
                <Questions testConfigs={testConfigs}/>
                <p>{marks}</p>
            </MarksContext.Provider>

        </>
    );
}