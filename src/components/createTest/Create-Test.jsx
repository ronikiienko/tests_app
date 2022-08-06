import React from 'react';
import CreateQuestion from './Create-Question.jsx';


export default function CreateTest() {
    const [configObjectGeneral, setConfigObjectGeneral] = React.useState({testName: '', testDescription: ''});
    const [configObjectQuestions, setConfigObjectQuestions] = React.useState([]);
    console.log(configObjectQuestions);
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
                answersType={createdQuestion.answersType}
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
            <button onClick={() => createNewQuestion('radio')}>Create radio question</button>
            <button onClick={() => createNewQuestion('checkbox')}>Create checkbox question</button>
            <button onClick={() => createNewQuestion('text')}>Create text question</button>
            <button onClick={() => createNewQuestion('number')}>Create number question</button>
            {questionElements}
        </div>

    );
}


// let emptyAnswers;
/*switch (answersType) {
    case 'radio':
        emptyAnswers = [
            {
                answer: '',
                mark: '',
            },
        ];
        break;
    case 'text':
        emptyAnswers = [
            {
                answer: '',
                mark: '',
            },
        ];
        break;
    case 'number':
        emptyAnswers = [
            {
                min: '',
                max: '',
                answer: ''
            }
        ]
        break;
    case 'checkbox':
        emptyAnswers = [
            {
                answer: '',
                mark: ''
            }
        ]
}*/