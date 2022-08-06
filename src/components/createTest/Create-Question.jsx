import React from 'react';
import CreateAnswers from './Create-Answers.jsx';


export default function CreateQuestion({questionIndex, setQuestions, answersType, questions}) {
    const [answers, setAnswers] = React.useState([]);
    const [questionGeneral, setQuestionGeneral] = React.useState({question: '', questionType: ''});
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
            newAnswers.push('');
            return newAnswers;
        });
    }

    function handleChange(event) {
        setQuestionGeneral(prevQuestionData => {
            /*let newQuestionData = {...prevQuestionData}
            [event.target.name] = event.target.value;*/
            return {
                ...prevQuestionData,
                [event.target.name]: event.target.value,
            };
        });
    }

    return (
        <>
            <h2>{questionIndex}.)</h2>
            <p>Question:</p>
            <input onChange={(event) => handleChange(event)} name="question" type="text"
                   value={questionGeneral.question} style={{display: "block"}}/>
            <p>Answers type:</p>

            <button onClick={addNewAnswer}>Add new answer</button>
            <button onClick={deleteQuestion}>Delete question</button>
            <CreateAnswers answers={answers} answersType={answersType} setAnswers={setAnswers}/>
        </>

    );
}