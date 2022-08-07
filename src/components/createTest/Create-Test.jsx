import React from 'react';
import CreateQuestion from './Create-Question.jsx';


export default function CreateTest() {
    const [configObjectGeneral, setConfigObjectGeneral] = React.useState({testName: '', testDescription: ''});
    const [configObjectQuestions, setConfigObjectQuestions] = React.useState([]);


    function handleChange(event) {
        setConfigObjectGeneral(prevGeneral => {
            return {
                ...prevGeneral,
                [event.target.name]: event.target.value,
            };
        });
    }

    let questionElements = configObjectQuestions.map((createdQuestion, index) => {
        return (
            <CreateQuestion
                key={index}
                questionIndex={index}
                setQuestions={setConfigObjectQuestions}
            />
        );
    });

    function createNewQuestion(questionType) {
        const emptyQuestionObject = {
            answersType: questionType,
        };
        setConfigObjectQuestions((prevQuestions) => {
            let newQuestions = [...prevQuestions];
            newQuestions.push(emptyQuestionObject);
            return (
                newQuestions
            );
        });
    }

    return (
        <div>
            <span>Test name: </span>
            <input value={configObjectGeneral.testName} onChange={event => handleChange(event)} name="testName"/>
            <br/>
            <span>Test description: </span>
            <br/>
            <textarea value={configObjectGeneral.testDescription} onChange={event => handleChange(event)}
                      name="testDescription"/>
            <br/>
            <button onClick={createNewQuestion}>Create question</button>
            {questionElements}
        </div>

    );
}