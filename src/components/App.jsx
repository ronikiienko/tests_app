import React from 'react';
import Questions from './Questions.jsx'
import Header from './Header.jsx'
import testConfigs from './../testConfig.js'


export default function App() {
    return (
        <div>
            <Header testConfigs={testConfigs}/>
            <Questions testConfigs={testConfigs}/>
        </div>
    );
}