import {nanoid} from 'nanoid';
import React from 'react';
import {TEST_QUESTION_ANSWER_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../../consts.js';
import {Checkbox} from '../../StyledElements/Checkbox/Checkbox.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import {Radio} from '../../StyledElements/Radio/Radio.jsx';
import './Question.css';

// TODO check if question data is changing
function areQuestionPropsChanged(prevProps, newProps) {
    const prevAnswers = prevProps.answers?.[prevProps.questionIndex] || [];
    const newAnswers = newProps.answers?.[prevProps.questionIndex] || [];
    if (prevAnswers.length !== newAnswers.length) return false;
    for (let i = 0; i < newAnswers.length; i++) {
        if (prevAnswers[i] !== newAnswers[i]) return false;
    }
    return true;
}

export function Question({questionData, questionIndex, answer, updateAnswer}) {
    const answerType = questionData[TEST_QUESTION_KEYS.answersType];
    const answersData = questionData[TEST_QUESTION_KEYS.answers];
    let maxChecked;
    if (!questionData[TEST_QUESTION_KEYS.maxChecked]) {
        maxChecked = 3;
    } else {
        maxChecked = questionData[TEST_QUESTION_KEYS.maxChecked];
    }

    function handleChange(event, checkboxIndex = 0) {
        switch (answerType) {
            case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
                updateAnswer({
                    answerType,
                    questionIndex,
                    newAnswer: event.target.checked,
                    checkboxIndex,
                    maxChecked,
                });
            }
                break;
            default: {
                updateAnswer({
                    answerType,
                    questionIndex,
                    newAnswer: event.target.value,
                });
            }
        }
    }

    return (
        <div className="question-container">
            <h2 className="question-header">{questionIndex + 1}.) {questionData[TEST_QUESTION_KEYS.question]}</h2>
            {(answerType === TEST_QUESTION_ANSWER_TYPE_MAP.number || answerType === TEST_QUESTION_ANSWER_TYPE_MAP.text) && (
                <>
                    <Input
                        type={answerType}
                        value={answer?.[0] || ''}
                        onChange={(event) => handleChange(event)}
                    />
                </>
            )}
            {answerType === TEST_QUESTION_ANSWER_TYPE_MAP.checkbox && (
                <>
                    <p className="question-description">Choose maximum {maxChecked} answers</p>
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Checkbox
                                    id={id}
                                    checked={answer?.[index]}
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
            {answerType === TEST_QUESTION_ANSWER_TYPE_MAP.radio && (
                <>
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Radio
                                    id={id}
                                    name={questionIndex}
                                    label={answerData[TEST_QUESTION_ANSWER_KEYS.answer]}
                                    checked={answer?.[0] === answerData.answer.toString()}
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

export const QuestionMemoized = React.memo(Question, areQuestionPropsChanged);