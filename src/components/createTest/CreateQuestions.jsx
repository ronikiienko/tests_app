import React from 'react';
import {TEST_QUESTION_ANSWER_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../../consts.js';
import {Button} from '../../StyledElements/Button/Button.jsx';
import {Input} from '../../StyledElements/Input/Input.jsx';
import {Radio} from '../../StyledElements/Radio/Radio.jsx';
import './CreateQuestions.css';


export const CreateQuestions = ({
                                    toggleQuestion,
                                    toggleQuestionAnswer,
                                    updateQuestionProperty,
                                    testQuestionsData,
                                    updateQuestionAnswerProperty,
                                }) => {
    return (
        <div>
            <h2>Questions and answers configs:</h2>
            <Button onClick={toggleQuestion}>Add question</Button>
            {testQuestionsData.map((questionData, questionIndex) => {
                return (
                    <div className="create-question-container" key={questionData[TEST_QUESTION_KEYS.id]}>
                        <Button onClick={() => toggleQuestion({questionIndex})}>Remove question</Button>
                        <p>{questionIndex + 1}.)</p>
                        <Input
                            label="Question:"
                            value={questionData[TEST_QUESTION_KEYS.question]}
                            onChange={(event) => {
                                updateQuestionProperty({
                                    propertyName: TEST_QUESTION_KEYS.question,
                                    newValue: event.target.value,
                                    questionIndex,
                                });
                            }}
                        />
                        <p>Select question answers type:</p>
                        {Object.values(TEST_QUESTION_ANSWER_TYPE_MAP).map((answersType) => {
                            return <Radio
                                key={answersType}
                                label={`${answersType}`}
                                checked={questionData[TEST_QUESTION_KEYS.answersType] === answersType}
                                onChange={() => updateQuestionProperty({
                                    propertyName: TEST_QUESTION_KEYS.answersType,
                                    newValue: answersType,
                                    questionIndex,
                                })}
                                id={`${questionData[TEST_QUESTION_KEYS.id]}${answersType}`}
                                name={questionData[TEST_QUESTION_KEYS.id]}
                            />;
                        })}
                        <br/>
                        <Button onClick={() => toggleQuestionAnswer({questionIndex})}>Add answer</Button>
                        {questionData[TEST_QUESTION_KEYS.answers]?.map((answer, answerIndex) => {
                            if (questionData[TEST_QUESTION_KEYS.answersType] === TEST_QUESTION_ANSWER_TYPE_MAP.number) {
                                return (
                                    <React.Fragment key={answer[TEST_QUESTION_ANSWER_KEYS.id]}>
                                        <Input
                                            label="Min:"
                                            type="number"
                                            value={answer[TEST_QUESTION_ANSWER_KEYS.min]}
                                            onChange={(event) => updateQuestionAnswerProperty({
                                                propertyName: TEST_QUESTION_ANSWER_KEYS.min,
                                                newValue: event.target.value,
                                                questionIndex,
                                                answerIndex,
                                            })}
                                        />
                                        <Input
                                            label="Max:"
                                            type="number"
                                            value={answer[TEST_QUESTION_ANSWER_KEYS.max]}
                                            onChange={(event) => updateQuestionAnswerProperty({
                                                propertyName: TEST_QUESTION_ANSWER_KEYS.max,
                                                newValue: event.target.value,
                                                questionIndex,
                                                answerIndex,
                                            })}
                                        />
                                        <Input
                                            label="Mark:"
                                            type="number"
                                            value={answer[TEST_QUESTION_ANSWER_KEYS.mark]}
                                            onChange={(event) => updateQuestionAnswerProperty({
                                                propertyName: TEST_QUESTION_ANSWER_KEYS.mark,
                                                newValue: event.target.value,
                                                questionIndex,
                                                answerIndex,
                                            })}
                                        />
                                        <Button onClick={() => toggleQuestionAnswer({questionIndex, answerIndex})}>Remove
                                            answer</Button>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <React.Fragment key={answer[TEST_QUESTION_ANSWER_KEYS.id]}>
                                        <Input
                                            label="Answer:"
                                            value={answer[TEST_QUESTION_ANSWER_KEYS.answer]}
                                            onChange={(event) => updateQuestionAnswerProperty({
                                                propertyName: TEST_QUESTION_ANSWER_KEYS.answer,
                                                newValue: event.target.value,
                                                questionIndex,
                                                answerIndex,
                                            })}
                                        />
                                        <Input
                                            label="Mark:"
                                            type="number"
                                            value={answer[TEST_QUESTION_ANSWER_KEYS.mark]}
                                            onChange={(event) => updateQuestionAnswerProperty({
                                                propertyName: TEST_QUESTION_ANSWER_KEYS.mark,
                                                newValue: event.target.value,
                                                questionIndex,
                                                answerIndex,
                                            })}
                                        />
                                        <Button onClick={() => toggleQuestionAnswer({questionIndex, answerIndex})}>Remove
                                            answer</Button>
                                    </React.Fragment>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};