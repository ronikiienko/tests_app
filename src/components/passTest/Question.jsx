import {nanoid} from 'nanoid';
import React from 'react';
import {TEST_QUESTION_ANSWER_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../../consts.js';
import {Checkbox} from '../../StyledElements/Checkbox/Checkbox.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import {Radio} from '../../StyledElements/Radio/Radio.jsx';
import './Question.css';


function areQuestionAnswersChanged(prevProps, newProps) {
    const prevAnswers = prevProps.answers?.[prevProps.questionIndex] || [];
    const newAnswers = newProps.answers?.[prevProps.questionIndex] || [];
    if (prevAnswers.length !== newAnswers.length) return false;
    for (let i = 0; i < newAnswers.length; i++) {
        if (prevAnswers[i] !== newAnswers[i]) return false;
    }
    return true;
}

export function Question({questionData, questionIndex, answers, setAnswers}) {
    const answersType = questionData[TEST_QUESTION_KEYS.answersType];
    const answersData = questionData[TEST_QUESTION_KEYS.answers];
    let maxChecked;
    if (!questionData.maxChecked) {
        maxChecked = 3;
    } else {
        maxChecked = questionData.maxChecked;
    }

    React.useEffect(() => {
        console.log(answers);
    }, [answers]);

    function handleChange(event, checkboxNumber) {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            const newAnswer = newAnswers[questionIndex]?.length ? [...newAnswers[questionIndex]] : [];
            if (answersType === 'checkbox') {
                if (!event.target.checked) {
                    newAnswer[checkboxNumber] = event.target.checked;
                }
                let answeredCount = 0;
                newAnswer.forEach(element => {
                    if (element) answeredCount++;
                });
                if (answeredCount < maxChecked && event.target.checked) newAnswer[checkboxNumber] = true;
            }
            if (answersType === 'radio' || answersType === 'number' || answersType === 'text') {
                newAnswer[0] = event.target.value;
            }
            newAnswers[questionIndex] = newAnswer;
            return newAnswers;
        });
    }
    return (
        <div className="question-container">
            <h2 className="question-header">{questionIndex + 1}.) {questionData[TEST_QUESTION_KEYS.question]}</h2>
            {(answersType === TEST_QUESTION_ANSWER_TYPE_MAP.number || answersType === TEST_QUESTION_ANSWER_TYPE_MAP.text) && (
                <>
                    <Input
                        type={answersType}
                        value={answers[questionIndex]?.[0] || ''}
                        onChange={(event) => handleChange(event, 0)}
                    />
                </>
            )}
            {answersType === TEST_QUESTION_ANSWER_TYPE_MAP.checkbox && (
                <>
                    <p className="question-description">Choose maximum {maxChecked} answers</p>
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Checkbox
                                    id={id}
                                    checked={answers[questionIndex]?.[index]}
                                    value={answerData.answer}
                                    onChange={(event) => handleChange(event, index)}
                                    label={answerData[TEST_QUESTION_ANSWER_KEYS.answer]}
                                />
                            </React.Fragment>
                        );
                    })
                    }
                </>
            )}
            {answersType === TEST_QUESTION_ANSWER_TYPE_MAP.radio && (
                <>
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Radio
                                    id={id}
                                    name={questionIndex}
                                    label={answerData[TEST_QUESTION_ANSWER_KEYS.answer]}
                                    checked={answers[questionIndex]?.[0] === answerData.answer.toString()}
                                    onChange={(event) => handleChange(event, index)}
                                    value={answerData.answer}
                                />
                            </React.Fragment>
                        );
                    })
                    }
                </>
            )}
        </div>
    );
}

export const QuestionMemoized = React.memo(Question, areQuestionAnswersChanged);