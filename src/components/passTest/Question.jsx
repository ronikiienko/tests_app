import React from 'react';
import Answers from './Answers.jsx';


export default function Question({questionData, questionIndex, answers, setAnswers, isInProcess}) {

    return (
        <div>
            <h2>{questionIndex + 1}.) {questionData.question}</h2>
            <Answers questionData={questionData} questionIndex={questionIndex} answers={answers} setAnswers={setAnswers}
                     isInProcess={isInProcess}/>
        </div>
    );
}