import React from 'react';
import PassTest from './passTest/PassTest.jsx';
import CreateTest from './createTest/Create-Test.jsx';
import testConfigs from '../testConfigs.js';
// import { saveAs } from 'file-saver';
export default function App() {
    const [mode, setMode] = React.useState('create')
    function setPassMode () {
        setMode('passTest');
    }
    function setCreateMode () {
        setMode('create')
    }


    /*function saveAsd () {
        let blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "hello world.js");
    }*/
    return (
        <>
            {/*<div>
                <button onClick={saveAsd}>Save as</button>
            </div>*/}
            <button onClick={setPassMode}>Pass test</button>
            <button onClick={setCreateMode}>Create test</button>
            {mode === 'passTest' && <PassTest testConfigs={testConfigs} disabled={false}/>}
            {mode === 'create' && <CreateTest/>}
        </>
    )
}