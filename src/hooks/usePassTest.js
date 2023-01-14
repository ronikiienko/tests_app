import React from 'react';
import {useImmerReducer} from 'use-immer';
import {DEFAULT_MAX_CHECKED, TEST_KEYS, TEST_QUESTION_ANSWER_TYPE_MAP, TEST_QUESTION_KEYS} from '../consts.js';


const dispatchCommands = {
    setAnswers: 'setAnswers',
};

const reducer = (answersDraft, action) => {
    const newAnswer = action.payload?.newAnswer;
    const questionIndex = action.payload?.questionIndex;
    const checkboxIndex = action.payload?.checkboxIndex;
    switch (action.type) {
        case TEST_QUESTION_ANSWER_TYPE_MAP.number:
        case TEST_QUESTION_ANSWER_TYPE_MAP.text:
        case TEST_QUESTION_ANSWER_TYPE_MAP.radio: {
            answersDraft[questionIndex] = [newAnswer];
        }
            break;
        case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
            let answeredCount = 0;
            if (answersDraft[questionIndex]?.length) {
                answersDraft[questionIndex].forEach(element => {
                    if (element) answeredCount++;
                });
            }
            if (answeredCount < action.payload.maxChecked && newAnswer) {
                if (!answersDraft[questionIndex]?.length) answersDraft[questionIndex] = [];
                answersDraft[questionIndex][checkboxIndex] = newAnswer;
            } else {
                if (!newAnswer) answersDraft[questionIndex][checkboxIndex] = newAnswer;
            }
        }
            break;
        case dispatchCommands.setAnswers: {
            return action.newAnswers;
        }
    }
};
export const usePassTest = (defaultAnswers, testConfigs) => {
    const [answers, dispatch] = useImmerReducer(reducer, defaultAnswers);

    // TODO exit where can error occur
    const updateAnswer = React.useCallback((answerData) => {
        const payload = {...answerData};
        const questionData = testConfigs?.[TEST_KEYS.questions]?.[payload.questionIndex];
        const answersType = questionData?.[TEST_QUESTION_KEYS.answersType];
        const maxChecked = questionData?.[TEST_QUESTION_KEYS.maxChecked] || DEFAULT_MAX_CHECKED;
        payload.answersType = answersType;
        payload.maxChecked = maxChecked;
        payload.answersType = testConfigs[TEST_KEYS.questions][payload.questionIndex][TEST_QUESTION_KEYS.answersType];
        dispatch({type: payload.answersType, payload});
    }, [testConfigs, dispatch]);

    const setAnswers = React.useCallback((newAnswers) => {
        dispatch({type: dispatchCommands.setAnswers, newAnswers});
    }, [dispatch]);

    return {answers, setAnswers, updateAnswer};
};