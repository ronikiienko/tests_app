import React from 'react'
import Question from './Question.jsx';
import { nanoid } from 'nanoid';


export default function Questions(props) {
    const questions = props.testConfigs.questions;
    const questionElements = questions.map(question => {
        return (
            <Question key={nanoid()} questionData={question} />
        )
    })
    return (
        <div>
            {questionElements}
        </div>

    )
}