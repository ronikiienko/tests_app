import {nanoid} from 'nanoid';
import React from 'react';
import Answers from './Answers';


export default function Question({questionData, inputsName, questionIndex}) {

    return (
        <div>
            <h2>{questionData.question}</h2>
            <Answers answersType={questionData.answersType} answersData={questionData.answers} inputsName={inputsName} questionIndex={questionIndex} />
        </div>


    )
}