import React from 'react';


export default function Results({marks, testConfigs}) {
    let marksSum = marks.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    let result = testConfigs.general.results.map((result, index) => {
        if (result.min <= marksSum && result.max >= marksSum) {
            return {
                resultTitle: result.resultName,
                resultDescription: result.resultDescription
            }
        }
    })
    return (
        <>
            <h2>:{result.resultTitle}</h2>
            <p>:{result.resultDescription}</p>
            <p>{marksSum} points</p>
        </>

    )
}