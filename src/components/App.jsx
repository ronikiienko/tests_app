import React from 'react';
import PassTest from './passTest/PassTest.jsx';
import CreateTest from './createTest/Create-Test.jsx';

export default function App() {
    const [mode, setMode] = React.useState('passTest')
    function setPassMode () {
        setMode('passTest');
    }
    function setCreateMode () {
        setMode('create')
    }



    return (
        <>
            {/*<div>
                <button onClick={saveAsd}>Save as</button>
            </div>*/}
            <button onClick={setPassMode}>Pass test</button>
            <button onClick={setCreateMode}>Create test</button>
            {mode === 'passTest' && <PassTest disabled={false}/>}
            {mode === 'create' && <CreateTest/>}
        </>
    )
}