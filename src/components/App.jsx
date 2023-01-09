import React from 'react';
import {MAIN_TAB_KEY, MAIN_TABS_MAP} from '../consts.js';
import {Tabs} from '../StyledElements/Tabs/Tabs.jsx';
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
            <Tabs
                tabsArray={[{id: MAIN_TABS_MAP.pass, label: MAIN_TABS_MAP.pass}, {
                    id: MAIN_TABS_MAP.create,
                    label: MAIN_TABS_MAP.create,
                }]}
                openedTab={mainTab}
                setOpenedTab={setMainTab}
            />
            {/*<Button onClick={() => {*/}
            {/*    setTab(MAIN_TABS_MAP.pass);*/}
            {/*}}>Pass test</Button>*/}
            {/*<Button onClick={() => {*/}
            {/*    setTab(MAIN_TABS_MAP.create);*/}
            {/*}}>Create test</Button>*/}
            {mainTab === MAIN_TABS_MAP.pass && <PassTest/>}
            {/*{mainTab === 'create' && <CreateTest/>}*/}
        </>
    )
}