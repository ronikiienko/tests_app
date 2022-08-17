import TableContext from '@mui/material/Table/TableContext';
import React from 'react';
import PassTest from './passTest/PassTest.jsx';
import CreateTest from './createTest/Create-Test.jsx';
import {Box, Tabs, Tab} from '@mui/material';
import {Check, Create} from '@mui/icons-material'




export default function App() {
    const [chosenTabNum, setChosenTabNum] = React.useState(0);
    const [mode, setMode] = React.useState('passTest')

    function handleTabChange(event, newValue) {
        console.log(newValue);
        setChosenTabNum(newValue)
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
                <Tabs
                    centered
                    value={chosenTabNum}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab icon={<Check />} label="Pass test"/>
                    <Tab icon={<Create />} label="Create test"/>
                </Tabs>
            </Box>
            {chosenTabNum === 0 && <PassTest disabled={false}/>}
            {chosenTabNum === 1 && <CreateTest/>}
        </>
    )
}