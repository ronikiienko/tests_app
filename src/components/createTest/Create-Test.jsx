import React, {useEffect} from 'react';
import CreateQuestion from './Create-Question.jsx';
import CreateResults from './Create-Results';
import { saveAs } from 'file-saver';

export default function CreateTest() {
    const [general, setGeneral] = React.useState({testName: '', testDescription: ''});
    const [questions, setQuestions] = React.useState([]);
    const [saveSignal, setSaveSignal] = React.useState(Date.now());
    const [testConfigObject, setTestConfigObject] = React.useState({});
    // console.log(testConfigObject);
    // console.log(questions);
    function exportTest () {
        let blob = new Blob([JSON.stringify(testConfigObject)], {type: "text/plain;charset=utf-8"});
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
    function setExistingTest (object) {
        setTestConfigObject(object);
        setGeneral({testName: object.general.testName, testDescription: object.general.testDescription});
        setQuestions([...object.questions])
    }

    async function openExistingTest() {
        let [fileHandle] = await window.showOpenFilePicker();
        let fileData = await fileHandle.getFile();
        let text = await fileData.text();
        let configObject = JSON.parse(text)
        setExistingTest(configObject)
    }

    return (
        <div>
            <button onClick={openExistingTest}>Edit test</button>
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
            <CreateResults setGeneral={setGeneral} saveSignal={saveSignal} configObject={testConfigObject}/>
            <br/>
            <button onClick={sendSaveSignal}>Save test</button>
            <button onClick={exportTest}>Export test</button>
        </div>

    );
}