import React from 'react';
import {checkTest} from '../../utils.js';
import {ResultsQuestion} from './Results-Question.jsx';


export function Results({answers, testConfigs}) {
    const {overallMark, resultName, resultDescription} = checkTest(answers, testConfigs);
    console.log(overallMark, resultName, resultDescription);
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <ResultsQuestion key={index} questionData={question} questionIndex={index} answers={answers}/>
        );
    });
    return (
        <>
            <div>You get: {overallMark} points</div>
            <div>{resultName}</div>
            <div>{resultDescription}</div>
            {questionElements}
        </>

    );
}