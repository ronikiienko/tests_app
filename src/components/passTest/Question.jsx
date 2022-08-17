import {Box} from '@mui/material';
import {nanoid} from 'nanoid';
import React from 'react';
import Answers from './Answers.jsx';



export default function Question({questionData, questionIndex, setMarks, isInProcess}) {

    return (
        <Box>
            <h2>{questionIndex + 1}.) {questionData.question}</h2>
            <Answers questionData={questionData} questionIndex={questionIndex} setMarks={setMarks} isInProcess={isInProcess} />
        </Box>

    )
}