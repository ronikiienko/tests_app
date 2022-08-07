import React from 'react';
import CreateQuestion from './Create-Question.jsx';
import CreateResults from './Create-Results';


export default function CreateTest() {
    const [general, setGeneral] = React.useState({testName: '', testDescription: ''});
    const [questions, setQuestions] = React.useState([]);


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
            />
        );
    });

    function createNewQuestion(questionType) {
        const emptyQuestionObject = {
            answersType: questionType,
        };
        setQuestions((prevQuestions) => {
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
            <input value={general.testName} onChange={event => handleChange(event)} name="testName"/>
            <br/>
            <span>Test description: </span>
            <br/>
            <textarea value={general.testDescription} onChange={event => handleChange(event)}
                      name="testDescription"/>
            <br/>
            <button onClick={createNewQuestion}>Create question</button>
            {questionElements}
            <CreateResults setGeneral={setGeneral}/>
        </div>

    );
}