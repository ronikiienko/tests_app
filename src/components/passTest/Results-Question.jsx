import {nanoid} from 'nanoid';
import React from 'react';
import {TEST_QUESTION_ANSWER_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../../consts.js';
import {Checkbox} from '../../StyledElements/Checkbox/Checkbox.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import {Radio} from '../../StyledElements/Radio/Radio.jsx';
import {checkQuestion} from '../../utils.js';
import './Results-Question.css';


export const ResultsQuestion = ({questionIndex, answers, questionData}) => {
    const {checkedArray} = checkQuestion(answers[questionIndex], questionData);
    const answersType = questionData[TEST_QUESTION_KEYS.answersType];
    if (answersType === TEST_QUESTION_ANSWER_TYPE_MAP.checkbox) console.log(checkedArray);
    const answersData = questionData[TEST_QUESTION_KEYS.answers];
    let maxChecked;
    if (!questionData[TEST_QUESTION_KEYS.maxChecked]) {
        maxChecked = 3;
    } else {
        maxChecked = questionData[TEST_QUESTION_KEYS.maxChecked];
    }
    const answersNodes = questionData[TEST_QUESTION_KEYS.answers]?.map((answer, index) => {
        if (answersType === TEST_QUESTION_ANSWER_TYPE_MAP.number) {
            return (
                <p className={`results-answer ${checkedArray?.[index] && 'checked'}`}
                   key={index}>{answer[TEST_QUESTION_ANSWER_KEYS.min]} - {answer[TEST_QUESTION_ANSWER_KEYS.max]}: {answer[TEST_QUESTION_ANSWER_KEYS.mark]}</p>
            );
        } else {
            return (
                <p className={`results-answer ${checkedArray?.[index] && 'checked'}`}
                   key={index}>{answer[TEST_QUESTION_ANSWER_KEYS.answer]}: {answer[TEST_QUESTION_ANSWER_KEYS.mark]}</p>
            );
        }

    });
    return (
        <div className="results-question-container">
            <h2 className="results-question-header">{questionIndex + 1}.) {questionData[TEST_QUESTION_KEYS.question]}</h2>
            {(answersType === TEST_QUESTION_ANSWER_TYPE_MAP.number || answersType === TEST_QUESTION_ANSWER_TYPE_MAP.text) && (
                <>
                    <Input
                        type={answersType}
                        value={answers[questionIndex]?.[0] || ''}
                        readOnly
                    />
                    {answersNodes}
                </>
            )}
            {answersType === TEST_QUESTION_ANSWER_TYPE_MAP.checkbox && (
                <>
                    {<p>Choose maximum {maxChecked} answers</p>}
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Checkbox
                                    checked={answers[questionIndex]?.[index]}
                                    readOnly
                                    name={questionIndex}
                                    label={answerData[TEST_QUESTION_ANSWER_KEYS.answer]}
                                />
                            </React.Fragment>
                        );
                    })
                    }
                    {answersNodes}
                </>
            )}
            {answersType === TEST_QUESTION_ANSWER_TYPE_MAP.radio && (
                <>
                    {answersData.map((answerData, index) => {
                        const id = nanoid();
                        return (
                            <React.Fragment key={id}>
                                <Radio
                                    checked={answers[questionIndex]?.[0] === answerData.answer.toString()}
                                    name={questionIndex.toString()}
                                    readOnly
                                    label={answerData[TEST_QUESTION_ANSWER_KEYS.answer]}
                                />
                            </React.Fragment>
                        );
                    })
                    }
                    {answersNodes}
                </>
            )}
        </div>
    );
};
