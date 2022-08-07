import React from 'react';
import CreateAnswers from './Create-Answers.jsx';


export default function CreateQuestion({questionIndex, setQuestions}) {
    const [answers, setAnswers] = React.useState([]);
    const [questionGeneral, setQuestionGeneral] = React.useState({question: '', answersType: ''});
    console.log(questionGeneral);
    function deleteQuestion() {
        setQuestions((prevQuestions) => {
            let newQuestions = [...prevQuestions];
            newQuestions.splice(questionIndex, 1);
            return (
                newQuestions
            );
        });
    }

    function addNewAnswer() {
        setAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            if (questionGeneral.answersType === 'number') {
                newAnswers.push({min: '', max: '', mark: ''});
            } else {
                newAnswers.push({answer: '', mark: ''})
            }
            return newAnswers;
        });
    }

    function handleChange(event) {
        setQuestionGeneral(prevQuestionData => {
            return {
                ...prevQuestionData,
                [event.target.name]: event.target.value,
            };
        });
    }

    React.useEffect(() => {
        let emptyAnswer;
        if (questionGeneral.answersType === 'number') {
            emptyAnswer = {
                min: '',
                max: '',
                mark: ''
            }
        } else {
            emptyAnswer = {
                answer: '',
                mark: ''
            }
        }
        setAnswers((prevAnswers) => {
            let newAnswers = [];
            for (let i = 0; i < prevAnswers.length; i++) {
                newAnswers.push(emptyAnswer)
            }
            return [...newAnswers];
        })
    }, [questionGeneral.answersType])


    return (
        <>
            <h2>{questionIndex}.)</h2>
            <p>Question:</p>
            <input onChange={(event) => handleChange(event)} name="question" type="text"
                   value={questionGeneral.question} style={{display: "block"}}/>
            <p>Answers type:</p>
            <input
                type='radio'
                name='answersType'
                id={`setTypeRadio${questionIndex}`}
                value='radio'
                onChange={(event) => handleChange(event)}
            />
            <label htmlFor={`setTypeRadio${questionIndex}`}>Radio</label>


            <input
                type='radio'
                name='answersType'
                id={`setTypeCheckbox${questionIndex}`}
                value='checkbox'
                onChange={(event) => handleChange(event)}
            />
            <label htmlFor={`setTypeCheckbox${questionIndex}`}>Checkbox</label>


            <input
                type='radio'
                name='answersType'
                id={`setTypeText${questionIndex}`}
                value='text'
                onChange={(event) => handleChange(event)}
            />
            <label htmlFor={`setTypeText${questionIndex}`}>Text</label>


            <input
                type='radio'
                name='answersType'
                id={`setTypeNumber${questionIndex}`}
                value='number'
                onChange={(event) => handleChange(event)}
            />
            <label htmlFor={`setTypeNumber${questionIndex}`}>Number</label>

            <br />
            {questionGeneral.answersType && <button onClick={addNewAnswer}>Add new answer</button>}
            <button onClick={deleteQuestion}>Delete question</button>
            <CreateAnswers answers={answers} answersType={questionGeneral.answersType} setAnswers={setAnswers}/>
        </>

    );
}