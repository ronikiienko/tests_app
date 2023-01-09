import React from 'react';
import {checkTest} from '../../utils.js';
import {ResultsQuestion} from './Results-Question.jsx';
import './Results.css';


export function Results({answers, testConfigs}) {
    const {overallMark, resultName, resultDescription} = checkTest(answers, testConfigs);
    const questionElements = testConfigs.questions.map((question, index) => {
        return (
            <ResultsQuestion key={index} questionData={question} questionIndex={index} answers={answers}/>
        );
    });
    return (
        <>
            <div className="results-description">
                <div>You get: {overallMark} points</div>
                <div>Result: {resultName}</div>
                <div>Result description: {resultDescription}</div>
            </div>
            {questionElements}
        </>

    );
}