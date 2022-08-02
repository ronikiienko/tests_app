import {nanoid} from 'nanoid';
import React from 'react';


export default function Question(props) {
    const [userAnswer, setUserAnswer] = React.useState('')
    console.log(props.questionData)
    const answers = props.questionData.answers;
    const answersType = props.questionData.answersType;
    const inputsName = nanoid();

    console.log(userAnswer)
    function handleChange(answer) {
        setUserAnswer(answer)
    }

    let answerElements;
    if (answersType === 'number') {
        answerElements = <input type={'number'}/>;
    } else if (answersType === 'text') {
        answerElements = <input type={'text'}/>;
    } else if (answersType === 'radio' || answersType === 'checkbox') {

        answerElements = answers.map(answer => {
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
                            checked={userAnswer === answerValue}
                            onChange={() => {
                                handleChange(answerValue)
                            }}
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
    return (
        <div>
            <h2>{props.questionData.question}</h2>
            {answerElements}
        </div>


    )
}