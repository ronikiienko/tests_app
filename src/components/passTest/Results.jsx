import {Alert, Box, Typography} from '@mui/material';
import React from 'react';
import ReactConfetti from 'react-confetti';


export default function Results({marks, testConfigs}) {
    let maximumMark = 0;
    testConfigs.questions.map(question => {
        let questionMarks = [];
        question.answers.map((answer) => {
            if (question.answersType === 'checkbox') {
                maximumMark = maximumMark + Number(answer.mark)
            } else {
                questionMarks.push(Number(answer.mark))
            }
        })
        if (question.answersType !== 'checkbox') {
            maximumMark = maximumMark + Math.max(...questionMarks)
        }
    })
    let marksSum = marks.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    let result = testConfigs.general.results.filter(result => result.min <= marksSum && result.max >= marksSum);
    let percent = marksSum / maximumMark;
    let alertVariant;

    if (percent <= 0.3) {
        alertVariant = 'error'
    } else if (percent > 0.3 && percent <= 0.8) {
        alertVariant = 'warning'
    } else if (percent > 0.8) {
        alertVariant = 'success'
    }
    console.log(alertVariant);
    return (
        <>
            <Alert
                severity={alertVariant}
                sx={{
                marginY: 5
            }}
            >
                <Typography variant='h3'>{result[0].resultName}</Typography>
                <Typography variant='h6'>{result[0].resultDescription}</Typography>
                <Typography variant='h6'>You've got: <strong>{marksSum}</strong> out of <strong>{maximumMark}</strong> points</Typography>
            </Alert>
        </>

    )
}