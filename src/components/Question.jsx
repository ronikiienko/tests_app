import React from 'react';


export default function Question(props) {
    console.log(props.questionInfo)
    return (
        <h1>{props.questionInfo.question}</h1>
    )
}