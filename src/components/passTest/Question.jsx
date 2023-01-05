import {nanoid} from 'nanoid';
import React from 'react';
import {TEST_QUESTION_KEYS} from '../../consts.js';


export function Answers({questionIndex, answers, setAnswers, isInProcess, questionData}) {
    console.log(answers);
    const answersType = questionData[TEST_QUESTION_KEYS.answersType];
    const answersData = questionData[TEST_QUESTION_KEYS.answers];
    let maxChecked;
    if (!questionData.maxChecked) {
        maxChecked = 3;
    } else {
        maxChecked = questionData.maxChecked;
    }

    function handleChange(event, checkboxNumber) {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            const newAnswer = newAnswers[questionIndex]?.length ? [...newAnswers[questionIndex]] : [];
            if (answersType === 'checkbox') {
                if (!event.target.checked) {
                    newAnswer[checkboxNumber] = undefined;
                } else {
                    newAnswer[checkboxNumber] = event.target.value.toString();
                }
            }
            if (answersType === 'radio' || answersType === 'number' || answersType === 'text') {
                newAnswer[0] = event.target.value.toString();
            }
            newAnswers[questionIndex] = newAnswer;
            return newAnswers;
        });
    }


    if (answersType === 'number' || answersType === 'text') {
        return (
            <>
                <label>
                    {answersData.answer}
                </label>
                <input
                    type={answersType}
                    value={answers[questionIndex]?.[0] || ''}
                    onChange={(event) => handleChange(event, 0)}
                />
            </>
        );
    }
    if (answersType === 'checkbox') {
        return (
            <>
                {answersData.map((answerData, index) => {
                    const id = nanoid();
                    return (
                        <label key={id}>
                            {answerData.answer}
                            <input
                                type={answersType}
                                name={questionIndex}
                                value={answerData.answer}
                                checked={answers[questionIndex]?.[index] === answerData.answer.toString()}
                                onChange={(event) => handleChange(event, index)}
                            />
                        </label>
                    );
                })
                }
            </>
        );
    }
    if (answersType === 'radio') {
        return (
            <>
                {answersType === 'checkbox' && <p>Choose {maxChecked} answers</p>}
                {answersData.map((answerData, index) => {
                    const id = nanoid();
                    return (
                        <label key={id}>
                            {answerData.answer}
                            <input
                                type={answersType}
                                name={questionIndex}
                                value={answerData.answer}
                                checked={answers[questionIndex]?.[0] === answerData.answer.toString()}
                                onChange={(event) => handleChange(event, index)}
                            />
                        </label>
                    );
                })
                }
            </>
        );
    }
}

export default function Question({questionData, questionIndex, answers, setAnswers, isInProcess}) {
    return (
        <div>
            <h2>{questionIndex + 1}.) {questionData.question}</h2>
            <Answers questionData={questionData} questionIndex={questionIndex} answers={answers} setAnswers={setAnswers}
                     isInProcess={isInProcess}/>
        </div>
    );
}