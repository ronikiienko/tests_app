import React from 'react';


export default function CreateAnswers({answers, setAnswers, answersType}) {
    console.log(answers);
    function deleteAnswer(event) {
        setAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            newAnswers.splice(event.target.name, 1);
            return (
                newAnswers
            );
        });
    }
    function handleChange(event, index) {
        setAnswers(prevAnswers => {
            let newAnswer = prevAnswers[index];
            newAnswer = {
                ...newAnswer,
                [event.target.name]: event.target.value
            }
            let newAnswers = [...prevAnswers];
            newAnswers[index] = newAnswer;
            return newAnswers;
        })
    }



    let answerElements = answers.map((answer, index) => {
        let fillAnswerInputs;
        if (answersType === 'number') {
            fillAnswerInputs =
                <>
                    <span>Min:</span>
                    <input type="number" name="min" value={answer.min} onChange={(event) => handleChange(event, index)}/>
                    <span>Max:</span>
                    <input type="number" name="max" value={answer.max} onChange={(event) => handleChange(event, index)}/>
                    <span>Mark:</span>
                    <input type="number" name="mark" value={answer.mark} onChange={(event) => handleChange(event, index)}/>
                </>;
        } else {
            fillAnswerInputs =
                <>
                    <span>Answer:</span>
                    <input type="text" name="answer" value={answer.answer} onChange={(event) => handleChange(event, index)}/>
                    <span>Mark:</span>
                    <input type="number" name="mark" value={answer.mark} onChange={(event) => handleChange(event, index)}/>
                </>;
        }
        return (
            <div key={index}>
                {fillAnswerInputs}
                <button name={index} onClick={(event) => deleteAnswer(event)}>Delete answer</button>
            </div>
        );
    });
    return (
        <>
            {answerElements}
        </>

    );
}