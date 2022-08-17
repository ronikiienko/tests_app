import React from 'react';
import ReactConfetti from 'react-confetti';


export default function Results({marks, testConfigs}) {
    const [confettiOpacity, setConfettiOpacity] = React.useState(1)
    let maximumMark = 0;
    testConfigs.questions.map(question => {
        let questionMarks = [];
        question.answers.map((answer) => {
            if (question.answersType === 'checkbox') {
                maximumMark = maximumMark + Number(answer.mark)
            } else {
                questionMarks.push(Number(answer.mark))
            }
        })
        if (question.answersType !== 'checkbox') {
            maximumMark = maximumMark + Math.max(...questionMarks)
        }
    })
    let marksSum = marks.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    let result = testConfigs.general.results.filter(result => result.min <= marksSum && result.max >= marksSum);

    return (
        <>
            {marksSum / maximumMark >= 0.9 && <ReactConfetti wind={0.01} numberOfPieces={200}/>}
            <h2>{result[0].resultName}</h2>
            <p>{result[0].resultDescription}</p>
            <p>You've got: {marksSum} out of {maximumMark} points</p>
        </>

    )
}