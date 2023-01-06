import React from 'react';
import {Button} from '../StyledElements/Button/Button.jsx';
import PassTest from './passTest/PassTest.jsx';


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
            <Button onClick={setPassMode}>Pass test</Button>
            <Button onClick={setCreateMode}>Create test</Button>
            {mode === 'passTest' && <PassTest/>}
            {/*{mode === 'create' && <CreateTest/>}*/}
        </>
    )
}