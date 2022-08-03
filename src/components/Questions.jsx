import React from 'react'
import Question from './Question.jsx';
import { nanoid } from 'nanoid';


export default function Questions({testConfigs}) {

    const questions = testConfigs.questions;
    const questionElements = questions.map((question, index) => {
        const inputsName = nanoid();
        return (
            <Question key={inputsName}  questionData={question} inputsName={inputsName} questionIndex={index} />
        )
    })
    return (
        <div>
            {questionElements}
        </div>

    )
}