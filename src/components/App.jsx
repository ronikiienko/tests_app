import React from 'react';
import PassTest from './createTest/PassTest.jsx';
import CreateTest from './createTest/CreateTest.jsx';
import testConfigs from '../testConfigs.js';

export default function App() {
    const [mode, setMode] = React.useState('create')
    function setPassMode () {
        setMode('passTest');
    }
    function setCreateMode () {
        setMode('create')
    }
    return (
        <>
            <button onClick={setPassMode}>Pass test</button>
            <button onClick={setCreateMode}>Create test</button>
            {mode === 'passTest' && <PassTest testConfigs={testConfigs} disabled={false}/>}
            {mode === 'create' && <CreateTest/>}
        </>
    )
}