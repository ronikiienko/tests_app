import {Box, Typography} from '@mui/material';
import React from 'react';
import Answers from './Answers.jsx';


export default function Question({questionData, questionIndex, setMarks, isInProcess}) {

    return (
        <Box sx={{mt: 1}}>
            <Typography variant="h5">{questionIndex + 1}.) {questionData.question}</Typography>
            <Answers questionData={questionData} questionIndex={questionIndex} setMarks={setMarks}
                     isInProcess={isInProcess}/>
        </Box>

    );
}