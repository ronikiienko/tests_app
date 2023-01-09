import React from 'react';
import {MAIN_TAB_KEY, MAIN_TABS_MAP} from '../consts.js';
import {Button} from '../StyledElements/Button/Button.jsx';
import {getItemFromStorage, setItemToStorage} from '../utils.js';
import PassTest from './passTest/PassTest.jsx';


export default function App() {
    const [mainTab, setMainTab] = React.useState(getItemFromStorage(MAIN_TAB_KEY) || MAIN_TABS_MAP.pass);

    function setTab(mainTab = MAIN_TABS_MAP.pass) {
        setMainTab(mainTab);
    }

    React.useEffect(() => {
        setItemToStorage(MAIN_TAB_KEY, mainTab);
    }, [mainTab]);

    return (
        <>
            {/*<div>
                <button onClick={saveAsd}>Save as</button>
            </div>*/}
            <Button onClick={() => {
                setTab(MAIN_TABS_MAP.pass);
            }}>Pass test</Button>
            <Button onClick={() => {
                setTab(MAIN_TABS_MAP.create);
            }}>Create test</Button>
            {mainTab === MAIN_TABS_MAP.pass && <PassTest/>}
            {/*{mainTab === 'create' && <CreateTest/>}*/}
        </>
    )
}