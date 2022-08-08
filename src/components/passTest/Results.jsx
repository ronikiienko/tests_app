import React from 'react';


export default function Results({marks, testConfigs}) {
    /*let maximumMark;
    testConfigs.questions.map(question => {

    })
    for (let i = 0; i < testConfigs.questions; i++) {
        let questionAnswers = testConfigs.questions[i].answers;
        let questionMarks;
        for (let i = 0; i < questionAnswers.length; i++) {
            questionMarks.push(questionAnswers[i].mark);
        }
        Math.max(...questionMarks)
    }*/
    let marksSum = marks.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    let result = testConfigs.general.results.filter(result => result.min <= marksSum && result.max >= marksSum);

    return (
        <>
            <h2>{result[0].resultName}</h2>
            <p>{result[0].resultDescription}</p>
            <p>You've got: {marksSum} points</p>
        </>

    )
}