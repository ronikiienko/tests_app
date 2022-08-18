import {Button, TextField} from '@mui/material';
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
                    <TextField name="min" type='number' label='Min' placeholder='Number' value={answer.min} onChange={(event) => handleChange(event, index)}/>
                    <TextField name="max" type='number' label='Max' placeholder='Number' value={answer.max} onChange={(event) => handleChange(event, index)}/>
                    <TextField name="mark" type='number' label='Mark' placeholder='Number' value={answer.mark} onChange={(event) => handleChange(event, index)}/>
                </>;
        } else {
            fillAnswerInputs =
                <>
                    <TextField type='text' name="answer" value={answer.answer} onChange={(event) => handleChange(event, index)} label='Answer' placeholder='Text'/>
                    <TextField type='number' name="mark" value={answer.mark} onChange={(event) => handleChange(event, index)} label='Mark' placeholder='Number'/>
                </>;
        }
        return (
            <div key={index}>
                {fillAnswerInputs}
                <Button variant='outlined' name={index} onClick={(event) => deleteAnswer(event)}>Delete answer</Button>
            </div>
        );
    });
    return (
        <>
            {answerElements}
        </>

    );
}