import React, {useCallback} from 'react';
import testConfigs from './../testConfig.js';
import Header from './Header.jsx';
import Questions from './Questions.jsx';


export const MarksContext = React.createContext();

export default function App() {

    const [marks, setMarks] = React.useState(new Array(testConfigs.questions.length));


    console.log(marks);
    const setMark = useCallback((questionIndex, mark) => {
        console.log(questionIndex, mark);
        setMarks((prevMarks) => {
            let newMarks = [...prevMarks];
            newMarks[questionIndex] = questionIndex;
            return newMarks;
        });
    }, [])

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