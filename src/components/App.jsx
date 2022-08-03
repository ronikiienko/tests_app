import React, {useCallback} from 'react';
import testConfigs from './../testConfig.js';
import Header from './Header.jsx';
import Questions from './Questions.jsx';
import Results from './Results.jsx'


export const MarksContext = React.createContext();

export default function App() {

    const [marks, setMarks] = React.useState(Array(testConfigs.questions.length).join('.').split('.'));


    // console.log(marks);


    return (
        <>
            <MarksContext.Provider value={setMarks}>
                <Header testConfigs={testConfigs}/>
                <Questions testConfigs={testConfigs}/>
                <Results />
                <button>Get results</button>
            </MarksContext.Provider>

        </>
    );
}