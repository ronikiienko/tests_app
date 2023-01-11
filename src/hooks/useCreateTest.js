import React from 'react';
import {useImmerReducer} from 'use-immer';
import {TEST_KEYS} from '../consts.js';


const dispatchCommands = {
    updateQuestionProperty: 'updateQuestion',
    addQuestion: 'addQuestion',
    setTestConfigs: 'setTestConfigs',
};

const initialTestConfigs = {
    [TEST_KEYS.general]: {},
    [TEST_KEYS.questions]: [],
};

const reducer = (testConfigState, action) => {
    let newTestConfigState = {...testConfigState};
    switch (action.type) {
        case dispatchCommands.addQuestion: {
            // TODO destructure or not to destructure
            let newQuestions = [...newTestConfigState[TEST_KEYS.questions]];
            newQuestions.push({});
            newTestConfigState[TEST_KEYS.questions] = newQuestions;
            return newTestConfigState;
        }
        case dispatchCommands.updateQuestionProperty: {
            let newQuestions = [...newTestConfigState[TEST_KEYS.questions]];
            newQuestions[action.payload.questionIndex][action.payload.propertyName] = action.payload.newValue;
            newTestConfigState[TEST_KEYS.questions] = newQuestions;
            return newTestConfigState;
        }
        case dispatchCommands.setTestConfigs: {
            return action.payload.newTestConfigs;
        }
    }
};
export const useCreateTest = () => {
    const [testConfigs, dispatch] = useImmerReducer(reducer, initialTestConfigs);

    const addQuestion = React.useCallback(() => {
        dispatch({type: dispatchCommands.addQuestion});
    }, [dispatch]);

    const updateQuestionProperty = React.useCallback((propertyName, newValue, questionIndex) => {
        dispatch({type: dispatchCommands.updateQuestionProperty, payload: {propertyName, newValue, questionIndex}});
    }, [dispatch]);

    const setTestConfigs = React.useCallback((newTestConfigs) => {
        dispatch({type: dispatchCommands.setTestConfigs, payload: {newTestConfigs}});
    }, [dispatch]);
    return {
        testConfigs,
        setTestConfigs,
        updateGeneralProperty,
        addResultRange,
        updateResultRangeProperty,
        addQuestion,
        updateQuestionProperty,
        addQuestionAnswer,
        updateQuestionAnswerProperty,
    };
};