import {saveAs} from 'file-saver';
import React from 'react';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {stringifyJSON} from '../../utils.js';
import CreateQuestion from './Create-Question.jsx';
import CreateResults from './Create-Results';


export default function CreateTest() {
    const [general, setGeneral] = React.useState({testName: '', testDescription: ''});
    const [questions, setQuestions] = React.useState([]);
    const [saveSignal, setSaveSignal] = React.useState(Date.now());
    const [editSignal, setEditSignal] = React.useState(Date.now());
    const [testConfigObject, setTestConfigObject] = React.useState({});
    // console.log(testConfigObject);
    // console.log(questions);

    React.useEffect(() => {
        setTestConfigObject({general: {...general}, questions: [...questions]});
    }, [questions]);
    console.clear();
    console.log(testConfigObject);
    React.useEffect(() => {
        setGeneral({testName: testConfigObject.testName, testDescription: testConfigObject.testDescription});
    }, [editSignal]);

    function sendSaveSignal() {
        setSaveSignal(Date.now());
    }

    function sendEditSignal() {
        setEditSignal(Date.now());
    }

    function exportTest() {
        console.log();
        let blob = new Blob([stringifyJSON(testConfigObject, true)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${general.testName}.txt`);
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
                editSignal={editSignal}
                testConfigObject={testConfigObject}
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

    function openTestConfigObject() {
        sendEditSignal();
    }

    async function openTestToEdit() {
        let [fileHandle] = await window.showOpenFilePicker();
        let fileData = await fileHandle.getFile();
        let text = await fileData.text();
        let testConfigObject = JSON.parse(text);
        setTestConfigObject(testConfigObject);
        openTestConfigObject(testConfigObject);
        /*console.log(testConfigObject);
        setTestConfigs(testConfigObject)*/
    }

    return (
        <div>
            <span>Test name: </span>
            <input value={general.testName} onChange={event => handleChange(event)} name="testName"/>
            <br/>
            <span>Test description: </span>
            <br/>
            <textarea value={general.testDescription} onChange={event => handleChange(event)}
                      name="testDescription"/>
            <br/>
            <button onClick={createNewQuestion}>Create question</button>
            {questionElements}
            <CreateResults setGeneral={setGeneral} saveSignal={saveSignal} editSignal={editSignal}
                           testConfigObject={testConfigObject}/>
            <br/>
            <Button onClick={sendSaveSignal}>Save test</Button>
            <Button onClick={exportTest}>Export test</Button>
            <Button onClick={openTestToEdit}>Edit test</Button>
        </div>

    );
}