import React from 'react';
import Questions from './Questions.jsx'
import Header from './Header.jsx'
import testConfigs from './../testConfig.js'


export default function App() {
    const [count, setCount] = React.useState(0);
    function add() {
        setCount(prevCount => prevCount + 1)
    }
    return (
        <div>
            <Header testConfigs={testConfigs}/>
            <Questions testConfigs={testConfigs}/>
            <p>{count}</p>
            <button onClick={add}>Add</button>
        </div>
    );
}