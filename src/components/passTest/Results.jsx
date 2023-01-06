import React from 'react';
import {checkTest} from '../../utils.js';
import Header from './Header.jsx';


export function Results({answers, testConfigs}) {
    const {overallMark, resultName, resultDescription} = checkTest(answers, testConfigs);
    console.log(overallMark, resultName, resultDescription);
    return (
        <>
            <Header testConfigs={testConfigs}/>
            <div>{overallMark}</div>
        </>

    );
}