import {Check, Create} from '@mui/icons-material';
import {Box, createTheme, CssBaseline, FormControlLabel, Switch, Tab, Tabs, ThemeProvider} from '@mui/material';
import React from 'react';
import CreateTest from './createTest/Create-Test.jsx';
import PassTest from './passTest/PassTest.jsx';


export default function App() {
    const [chosenTabNum, setChosenTabNum] = React.useState(1);
    const [mode, setMode] = React.useState('passTest');
    const [theme, setTheme] = React.useState(false);

    function handleTabChange(event, newValue) {
        setChosenTabNum(newValue);
    }

    function handleThemeChange() {
        setTheme(prevTheme => {
            return !prevTheme;
        });
    }

    const createdTheme = createTheme({
        palette: {
            mode: theme ? 'light' : 'dark',
        },
    });

    return (
        <>
            <ThemeProvider theme={createdTheme}>
                <CssBaseline/>
                <Box sx={{borderBottom: 1, borderColor: 'divider', mb: 2}}>

                    <Tabs
                        centered
                        value={chosenTabNum}
                        onChange={handleTabChange}
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab icon={<Check/>} label="Pass test"/>
                        <Tab icon={<Create/>} label="Create test"/>
                    </Tabs>

                </Box>

                <FormControlLabel
                    sx={{
                        margin: 'auto',
                        display: 'block',
                        width: 'fit-content'
                    }}
                    control={
                        <Switch
                            checked={theme}
                            onChange={handleThemeChange}
                        />
                    }
                    label="Theme"
                />
                <Box width="fit-content" maxWidth='90%' m="auto">
                    {chosenTabNum === 0 && <PassTest disabled={false}/>}
                    {chosenTabNum === 1 && <CreateTest/>}
                </Box>
            </ThemeProvider>
        </>

    );
}