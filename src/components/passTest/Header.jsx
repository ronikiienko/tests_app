import React from 'react';


export default function Header({testConfigs}) {
    return (
        <header>
            <h1>{testConfigs.general.testName}</h1>
            <p>{testConfigs.general.testDescription}</p>
        </header>

    );
}