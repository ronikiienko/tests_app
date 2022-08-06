import React from 'react';


export default function CreateAnswers({answers, setAnswers, answersType}) {
    function deleteAnswer(event) {
        setAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            newAnswers.splice(event.target.name, 1);
            return (
                newAnswers
            );
        });
    }


    let answerElements = answers.map((answer, index) => {
        let fillAnswerInputs;
        if (answersType === 'number') {
            fillAnswerInputs =
                <>
                    <p>{answersType}</p>
                    <span>Min:</span>
                    <input type="number" name="min"/>
                    <span>Max:</span>
                    <input type="number" name="max"/>
                    <span>Mark:</span>
                    <input type="number" name="mark"/>
                </>;
        } else {
            fillAnswerInputs =
                <>
                    <p>{answersType}</p>
                    <span>Answer:</span>
                    <input type="text" name="answer"/>
                    <span>Mark:</span>
                    <input type="number" name="mark"/>
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