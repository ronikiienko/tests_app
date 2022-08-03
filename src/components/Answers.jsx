import {nanoid} from 'nanoid';
import React from 'react';
import {MarksContext} from './App.jsx';


export default function Answers({answersType, answers, inputsName, questionIndex}) {
    /*let array = new Array(4);
    array[2] = 'Hello'
    console.log(array);*/

    const [userAnswerMark, setUserAnswerMark] = React.useState('')
    const [userAnswer, setUserAnswer] = React.useState('')
    const sendMarkToAppComp = React.useContext(MarksContext);


    function handleChange(event) {
        setUserAnswer(event.target.value);
        handleUserAnswer();
        sendMarkToAppComp(questionIndex, userAnswer)
    }
    function handleUserAnswer () {

    }


    if (answersType === 'number') {
        return <input type={'number'} value={userAnswer} onChange={(event) => handleChange(event)}/>
    } else if (answersType === 'text') {
        return <input type={'text'} value={userAnswer} onChange={(event) => handleChange(event)} />;
    } else if (answersType === 'radio' || answersType === 'checkbox') {

        return answers.map(answer => {
            let answerValue = answer.answer;
            const id = nanoid();
            if (answersType === 'radio') {
                return  (
                    <div key={id}>
                        <input
                            type='radio'
                            id={id}
                            name={inputsName}
                            value={answerValue}
                            checked={Number(userAnswer) === answerValue}
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor={id} >{answerValue}</label>
                    </div>

                )
            } else if (answersType === 'checkbox') {
                return  (
                    <div key={id}>
                        <input
                            type='checkbox'
                            id={id}
                            name={inputsName}
                        />
                        <label htmlFor={id} >{answerValue}</label>
                    </div>

                )
            }
        });
    }
}