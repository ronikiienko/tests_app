import React from 'react'
import Question from './Question.jsx';
import { nanoid } from 'nanoid';


export default function Questions(props) {
    const questionsInfo = props.testConfigs.questions;
    const questions = questionsInfo.map(questionInfo => {
        return (
            <Question key={nanoid()} questionInfo={questionInfo} />
        )
    })
    return (
        <div>
            {questions}
        </div>

    )
}