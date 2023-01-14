import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {TEST_QUESTION_ANSWER_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../../consts.js';
import {AddItemButton} from '../../StyledElements/AddItemButton/AddItemButton.jsx';
import {CloseButton} from '../../StyledElements/CloseButton/CloseButton.jsx';
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
        <div className="create-questions-container">
            <h1 className="create-questions-header">Questions and answers configs</h1>
            <TransitionGroup component="div">
                {testQuestionsData.map((questionData, questionIndex) => {
                    return (
                        <CSSTransition
                            key={questionData[TEST_QUESTION_KEYS.id]}
                            timeout={200}
                            classNames="create-question-appear"
                        >
                            <div className="create-question-container">
                                <CloseButton
                                    onClick={() => toggleQuestion({questionIndex})}
                                    style={{
                                        fontSize: '30px',
                                        width: '80px',
                                        position: 'absolute',
                                        right: 0,
                                        top: 0,
                                        height: '80px',
                                        borderBottomLeftRadius: 0,
                                        borderTopLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                    }}
                                >
                                    -
                                </CloseButton>
                                <p className="create-question-index">{questionIndex + 1}).</p>
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
                                <br/>
                                {questionData[TEST_QUESTION_KEYS.answersType] === TEST_QUESTION_ANSWER_TYPE_MAP.checkbox &&
                                    <Input
                                        label="Max checked answers:"
                                        value={questionData[TEST_QUESTION_KEYS.maxChecked]}
                                        onChange={(event) => {
                                            updateQuestionProperty({
                                                propertyName: TEST_QUESTION_KEYS.maxChecked,
                                                newValue: event.target.value,
                                                questionIndex,
                                            });
                                        }}
                                    />}
                                <p className="create-select-type-label">Select question answers type:</p>
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
                                <TransitionGroup component="div">
                                    {questionData[TEST_QUESTION_KEYS.answers]?.map((answer, answerIndex) => {
                                        return (
                                            <CSSTransition
                                                timeout={200}
                                                classNames="create-question-answer-appear"
                                                key={answer[TEST_QUESTION_ANSWER_KEYS.id]}
                                            >
                                                <div className="create-answer-container">
                                                    {questionData[TEST_QUESTION_KEYS.answersType] === TEST_QUESTION_ANSWER_TYPE_MAP.number && <>
                                                        <Input
                                                            className="input-small"
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
                                                            className="input-small"
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
                                                    </>}
                                                    {questionData[TEST_QUESTION_KEYS.answersType] !== TEST_QUESTION_ANSWER_TYPE_MAP.number && <>
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
                                                    </>}
                                                    <br/>
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
                                                    <br/>
                                                    <CloseButton
                                                        onClick={() => toggleQuestionAnswer({
                                                            questionIndex,
                                                            answerIndex,
                                                        })}
                                                        style={{
                                                            fontSize: '30px',
                                                            width: '50px',
                                                            position: 'absolute',
                                                            right: 0,
                                                            top: 0,
                                                            height: '100%',
                                                            borderBottomLeftRadius: 0,
                                                            borderTopLeftRadius: 0,
                                                        }}
                                                    >
                                                        -
                                                    </CloseButton>
                                                </div>
                                            </CSSTransition>
                                        );
                                    })}
                                </TransitionGroup>

                                <AddItemButton
                                    onClick={() => toggleQuestionAnswer({questionIndex})}
                                    style={{
                                        marginTop: '20px',
                                        marginInline: 'auto',
                                        width: '90%',
                                        height: '40px',
                                    }}
                                >
                                    Add answer
                                </AddItemButton>
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
            <AddItemButton
                style={{
                    minWidth: '80%',
                    width: 'fit-content',
                    marginInline: 'auto',
                    paddingInline: '10px',
                    fontSize: '30px',
                }}
                onClick={toggleQuestion}
            >
                Add question
            </AddItemButton>
        </div>
    );
};