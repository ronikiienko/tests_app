import {nanoid} from 'nanoid';
import React from 'react';
import {TEST_QUESTION_KEYS} from '../../consts.js';


function areThisQuestionAnswersChanged(prevProps, newProps) {
    const prevAnswers = prevProps.answers?.[prevProps.questionIndex] || [];
    const newAnswers = newProps.answers?.[prevProps.questionIndex] || [];
    if (prevAnswers.length !== newAnswers.length) return false;
    for (let i = 0; i < newAnswers.length; i++) {
        if (prevAnswers[i] !== newAnswers[i]) return false;
    }
    return true;
}

function Answers({questionIndex, answers, setAnswers, isInProcess, questionData}) {
    console.log('a', questionData[TEST_QUESTION_KEYS.answersType]);
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
                    let answeredCount = 0;
                    console.log(newAnswer);
                    newAnswer.forEach(element => {
                        if (element) answeredCount++;
                    });
                    console.log(answeredCount);
                    if (answeredCount < maxChecked) newAnswer[checkboxNumber] = event.target.value.toString();
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
                {answersType === 'checkbox' && <p>Choose maximum {maxChecked} answers</p>}
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

const AnswersMemoized = React.memo(Answers, areThisQuestionAnswersChanged);


export default function Question({questionData, questionIndex, answers, setAnswers, isInProcess}) {
    return (
        <div>
            <h2>{questionIndex + 1}.) {questionData.question}</h2>
            <AnswersMemoized questionData={questionData} questionIndex={questionIndex} answers={answers}
                             setAnswers={setAnswers}
                             isInProcess={isInProcess}/>
        </div>
    );
}