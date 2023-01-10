import {saveAs} from 'file-saver';
import React from 'react';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {stringifyJSON} from '../../utils.js';
import CreateQuestion from './CreateQuestion.jsx';
import CreateResults from './CreateResults.jsx';


export default function CreateTest() {
    const [testConfigObject, setTestConfigObject] = React.useState({});
    // console.log(testConfigObject);
    // console.log(questions);


    function exportTest() {
        console.log();
        let blob = new Blob([stringifyJSON(testConfigObject, true)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, `${general.testName}.txt`);
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