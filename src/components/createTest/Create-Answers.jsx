import {Close, Delete} from '@mui/icons-material';
import {Box, Button, Grid, IconButton, TextField} from '@mui/material';
import React from 'react';


export default function CreateAnswers({answers, setAnswers, answersType}) {
    function deleteAnswer(index) {
        console.log(index);
        setAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            newAnswers.splice(index, 1);
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
                    <Grid container columns={2}>
                        <Grid item gridRow={1} gridColumn={1} xs={1}>
                            <TextField sx={{marginX: 1, width: 'fit-content'}} name="min" type='number' label='Min' placeholder='Number' value={answer.min} onChange={(event) => handleChange(event, index)}/>
                        </Grid>
                        <Grid item gridRow={1} gridColumn={2} xs={1}>
                            <TextField sx={{marginX: 1, width: 'fit-content' }} name="max" type='number' label='Max' placeholder='Number' value={answer.max} onChange={(event) => handleChange(event, index)}/>
                        </Grid>
                    </Grid>
                    <TextField sx={{marginX: 1, width: '50%', margin: 'auto', display: 'block', marginY: 2}} name="mark" type='number' label='Mark' placeholder='Number' value={answer.mark} onChange={(event) => handleChange(event, index)}/>
                </>

        } else {
            fillAnswerInputs =
                <Box >
                    <TextField sx={{marginX: 1, width: '100%', marginY: 2}} type='text' name="answer" value={answer.answer} onChange={(event) => handleChange(event, index)} label='Answer' placeholder='Text'/>
                    <TextField sx={{marginX: 1,  width: 150, margin: 'auto', display: 'block'}} type='number' name="mark" value={answer.mark} onChange={(event) => handleChange(event, index)} label='Mark' placeholder='Number'/>
                </Box>;
        }
        return (
            <Box key={index} sx={{
                borderBottom: 1,
                marginInline: 2,
                marginBottom: 2
            }}>
                {fillAnswerInputs}
                <IconButton sx={{
                    display: 'block',
                    margin: 'auto'
                }} color='error' variant='outlined' onClick={() => deleteAnswer(index)}>
                    <Delete name={index}/>
                </IconButton>
            </Box>

        );
    });
    return (
        <>
            {answerElements}
        </>

    );
}