import React from 'react';


export default function Results({marks, testConfigs}) {
    let marksSum = marks.reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    let result = testConfigs.general.results.filter(result => result.min <= marksSum && result.max >= marksSum);

    return (
        <>
            <h2>{result[0].resultName}</h2>
            <p>{result[0].resultDescription}</p>
            <p>{marksSum} points</p>
        </>

    )
}