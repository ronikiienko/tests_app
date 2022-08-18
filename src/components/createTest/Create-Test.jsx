import {Box, Button, TextField, Typography} from '@mui/material';
import {saveAs} from 'file-saver';
import React from 'react';
import CreateQuestion from './Create-Question.jsx';
import CreateResults from './Create-Results';


export default function CreateTest() {
    const [general, setGeneral] = React.useState({testName: '', testDescription: ''});
    const [questions, setQuestions] = React.useState([]);
    const [saveSignal, setSaveSignal] = React.useState(Date.now());
    const [testConfigObject, setTestConfigObject] = React.useState({});
    // console.log(testConfigObject);
    // console.log(questions);
    function exportTest() {
        let blob = new Blob([JSON.stringify(testConfigObject)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${general.testName}.txt`);
    }

    React.useEffect(() => {
        setTestConfigObject({general: {...general}, questions: [...questions]});
    }, [questions]);


    function sendSaveSignal() {
        setSaveSignal(Date.now());

    }

    function handleChange(event) {
        setGeneral(prevGeneral => {
            return {
                ...prevGeneral,
                [event.target.name]: event.target.value,
            };
        });
    }

    let questionElements = questions.map((createdQuestion, index) => {
        return (
            <CreateQuestion
                key={index}
                questionIndex={index}
                setQuestions={setQuestions}
                saveSignal={saveSignal}
                configObject={testConfigObject}
            />
        );
    });

    function createNewQuestion(questionType) {
        setQuestions((prevQuestions) => {
            let newQuestions = [...prevQuestions];
            newQuestions.push({});
            return (
                newQuestions
            );
        });
    }

    /*React.useEffect(() => {
        console.log(testConfigObject);
    }, [testConfigObject])*/
    function setExistingTest(object) {
        setTestConfigObject(object);
        setGeneral({testName: object.general.testName, testDescription: object.general.testDescription});
        setQuestions([...object.questions]);
    }

    async function openExistingTest() {
        let [fileHandle] = await window.showOpenFilePicker();
        let fileData = await fileHandle.getFile();
        let text = await fileData.text();
        let configObject = JSON.parse(text);
        setExistingTest(configObject);
    }

    return (
        <Box sx={{
            mt: 2
        }}>
            <TextField
                sx={{
                    margin: 'auto'
                }}
                placeholder="Text"
                label="Text name"
                value={general.testName}
                onChange={event => handleChange(event)}
                name="testName"
            />
            <br/>
            <TextField
                sx={{
                    marginY: 2,
                    width: '100%'
                }}
                maxRows={6}
                multiline
                placeholder="Text"
                label="Text description"
                value={general.testDescription}
                onChange={event => handleChange(event)}
                name="testDescription"
            />
            <br/>
            <Typography variant="h5">Questions:</Typography>
            {questionElements}
            <Button fullWidth sx={{height: 60, my: 4}} variant="outlined" color="success" onClick={createNewQuestion}>Create question</Button>
            <Typography variant="h5">Results:</Typography>
            <CreateResults setGeneral={setGeneral} saveSignal={saveSignal} configObject={testConfigObject}/>
            <br/>
            <Button variant="outlined" onClick={sendSaveSignal}>Save test</Button>
            <Button variant="outlined" onClick={exportTest}>Export test</Button>
            <Button variant="outlined" onClick={openExistingTest}>Edit test</Button>
        </Box>

    );
}