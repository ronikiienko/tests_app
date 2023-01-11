import React, {useReducer} from 'react';
import {TEST_QUESTION_ANSWER_TYPE_MAP} from '../consts.js';


const dispatchCommands = {
    setAnswers: 'setAnswers',
};

const reducer = (answersState, action) => {
    const newAnswer = action.answerData?.newAnswer;
    const questionIndex = action.answerData?.questionIndex;
    const checkboxIndex = action.answerData?.checkboxIndex;

    switch (action.type) {
        case TEST_QUESTION_ANSWER_TYPE_MAP.number:
        case TEST_QUESTION_ANSWER_TYPE_MAP.text:
        case TEST_QUESTION_ANSWER_TYPE_MAP.radio: {
            let newAnswers = [...answersState];
            if (action.type === TEST_QUESTION_ANSWER_TYPE_MAP.number) {
                newAnswers[questionIndex] = [Number(newAnswer)];
            } else {
                newAnswers[questionIndex] = [newAnswer.toString()];
            }
            return newAnswers;
        }
        case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
            let newAllAnswers = [...answersState];
            // TODO destructure or not to destructure
            let newQuestionAnswers = newAllAnswers[action.answerData.questionIndex];
            // let newQuestionAnswers = [...newAllAnswers[action.answerData.questionIndex]];
            let answeredCount = 0;
            if (newQuestionAnswers?.length) {
                newQuestionAnswers.forEach(element => {
                    if (element) answeredCount++;
                });
            }
            if (answeredCount < action.answerData.maxChecked && newAnswer) {
                if (!newQuestionAnswers?.length) newQuestionAnswers = [];
                newQuestionAnswers[checkboxIndex] = newAnswer;
                newAllAnswers[questionIndex] = newQuestionAnswers;
                return newAllAnswers;
            } else {
                if (!newAnswer) newQuestionAnswers[checkboxIndex] = newAnswer;
                return newAllAnswers;
            }
        }
        case dispatchCommands.setAnswers: {
            return action.newAnswers;
        }
    }
};
export const usePassTest = (defaultAnswers) => {
    const [answers, dispatch] = useReducer(reducer, defaultAnswers);

    const updateAnswer = React.useCallback((answerData) => {
        dispatch({type: answerData.answerType, answerData});
    }, []);

    const setAnswers = React.useCallback((newAnswers) => {
        dispatch({type: dispatchCommands.setAnswers, newAnswers});
    }, []);

    return {answers, setAnswers, updateAnswer};
};