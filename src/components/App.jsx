import {nanoid} from 'nanoid';
import React from 'react';
import {MAIN_TAB_KEY, MAIN_TABS_MAP, USER_ID_KEY} from '../consts.js';
import {Tabs} from '../StyledElements/Tabs/Tabs.jsx';
import {getItemFromStorage, setItemToStorage} from '../utils.js';
import CreateTest from './createTest/CreateTest.jsx';
import PassTest from './passTest/PassTest.jsx';


export default function App() {
    const [mainTab, setMainTab] = React.useState(getItemFromStorage(MAIN_TAB_KEY) || MAIN_TABS_MAP.pass);
    if (!getItemFromStorage(USER_ID_KEY)) setItemToStorage(USER_ID_KEY, nanoid());

    React.useEffect(() => {
        setItemToStorage(MAIN_TAB_KEY, mainTab);
    }, [mainTab]);

    return (
        <>
            <Tabs
                tabsArray={[
                    {id: MAIN_TABS_MAP.pass, label: 'Pass test'},
                    {id: MAIN_TABS_MAP.create, label: 'Create test'},
                ]}
                openedTab={mainTab}
                setOpenedTab={setMainTab}
            />
            {mainTab === MAIN_TABS_MAP.pass && <PassTest/>}
            {mainTab === 'create' && <CreateTest/>}
        </>
    )
}