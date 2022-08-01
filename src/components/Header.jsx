import React from 'react';


export default function Header(props) {
    return (
        <header>
            <h1>{props.testConfigs.general.testName}</h1>
            <p>{props.testConfigs.general.testDescription}</p>
        </header>

    )
}