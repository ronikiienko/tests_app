import React from 'react';
import {useImmerReducer} from 'use-immer';
import {TEST_GENERAL_KEYS, TEST_KEYS, TEST_QUESTION_KEYS} from '../consts.js';


const dispatchCommands = {
    updateQuestionProperty: 'updateQuestion',
    updateGeneralProperty: 'updateGeneralProperty',
    addQuestion: 'addQuestion',
    setTestConfigs: 'setTestConfigs',
    addResultRange: 'addResultRange',
    updateResultRangeProperty: 'updateResultRangeProperty',
    addQuestionAnswer: 'addQuestionAnswer',
    updateQuestionAnswerProperty: 'updateQuestionAnswerProperty',
};

const initialTestConfigs = {
    [TEST_KEYS.general]: {},
    [TEST_KEYS.questions]: [],
};

const reducer = (testConfigDraft, action) => {
    const payload = action.payload;
    switch (action.type) {
        case dispatchCommands.updateGeneralProperty: {
            testConfigDraft[TEST_KEYS.general][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.addResultRange: {
            testConfigDraft[TEST_KEYS.general][TEST_GENERAL_KEYS.results].push({});
        }
            break;
        case dispatchCommands.updateResultRangeProperty: {
            testConfigDraft[TEST_KEYS.general][TEST_GENERAL_KEYS.results][payload.resultRangeIndex][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.addQuestion: {
            testConfigDraft[TEST_KEYS.questions].push({});
        }
            break;
        case dispatchCommands.updateQuestionProperty: {
            testConfigDraft[TEST_KEYS.questions][payload.questionIndex][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.addQuestionAnswer: {
            testConfigDraft[TEST_KEYS.questions][payload.questionIndex][TEST_QUESTION_KEYS.answers].push({});
        }
            break;
        case dispatchCommands.updateQuestionAnswerProperty: {
            testConfigDraft[TEST_KEYS.questions][payload.questionIndex][TEST_QUESTION_KEYS.answers][payload.answerIndex][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.setTestConfigs: {
            return action.payload.newTestConfigs;
        }
    }
};
export const useCreateTest = () => {
    const [testConfigs, dispatch] = useImmerReducer(reducer, initialTestConfigs);

    const updateGeneralProperty = React.useCallback(({propertyName, newValue}) => {
        dispatch({type: dispatchCommands.updateGeneralProperty, payload: {propertyName, newValue}});
    }, [dispatch]);

    const addResultRange = React.useCallback(() => {
        dispatch({type: dispatchCommands.addResultRange});
    }, [dispatch]);

    const updateResultRangeProperty = React.useCallback(({propertyName, newValue, resultRangeIndex}) => {
        dispatch({
            type: dispatchCommands.updateResultRangeProperty,
            payload: {propertyName, newValue, resultRangeIndex},
        });
    }, [dispatch]);

    const addQuestion = React.useCallback(() => {
        dispatch({type: dispatchCommands.addQuestion});
    }, [dispatch]);

    const updateQuestionProperty = React.useCallback(({propertyName, newValue, questionIndex}) => {
        dispatch({type: dispatchCommands.updateQuestionProperty, payload: {propertyName, newValue, questionIndex}});
    }, [dispatch]);

    const addQuestionAnswer = React.useCallback(() => {
        dispatch({type: dispatchCommands.addQuestionAnswer});
    }, [dispatch]);

    const updateQuestionAnswerProperty = React.useCallback(({propertyName, newValue, questionIndex, answerIndex}) => {
        dispatch({
            type: dispatchCommands.updateQuestionAnswerProperty,
            payload: {propertyName, newValue, questionIndex, answerIndex},
        });
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