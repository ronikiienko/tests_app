import {nanoid} from 'nanoid';
import React from 'react';
import {useImmerReducer} from 'use-immer';
import {
    CREATE_TEST_IN_PROCESS_KEY,
    TEST_GENERAL_KEYS,
    TEST_GENERAL_RESULT_RANGE_KEYS,
    TEST_KEYS,
    TEST_QUESTION_ANSWER_KEYS,
    TEST_QUESTION_ANSWER_TYPE_MAP,
    TEST_QUESTION_KEYS,
    USER_ID_KEY,
} from '../consts.js';
import {getItemFromStorage, setItemToStorage} from '../utils.js';


const dispatchCommands = {
    updateQuestionProperty: 'updateQuestion',
    updateGeneralProperty: 'updateGeneralProperty',
    toggleQuestion: 'toggleQuestion',
    setTestConfigs: 'setTestConfigs',
    toggleResultRange: 'toggleResultRange',
    updateResultRangeProperty: 'updateResultRangeProperty',
    toggleQuestionAnswer: 'toggleQuestionAnswer',
    updateQuestionAnswerProperty: 'updateQuestionAnswerProperty',
};

const getInitialTestConfigs = () => {
    return {
        [TEST_KEYS.general]: {
            [TEST_GENERAL_KEYS.creatorId]: getItemFromStorage(USER_ID_KEY) || 'unknownuser',
            [TEST_GENERAL_KEYS.testName]: '',
            [TEST_GENERAL_KEYS.testDescription]: '',
            [TEST_GENERAL_KEYS.results]: [],
        },
        [TEST_KEYS.questions]: [],
    };
};

const getInitialResultRangeConfigs = () => {
    return {
        [TEST_GENERAL_RESULT_RANGE_KEYS.resultName]: '',
        [TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]: '',
        [TEST_GENERAL_RESULT_RANGE_KEYS.min]: '',
        [TEST_GENERAL_RESULT_RANGE_KEYS.max]: '',
        [TEST_GENERAL_RESULT_RANGE_KEYS.id]: nanoid(),
    };
};
const getInitialQuestionConfigs = () => {
    return {
        [TEST_QUESTION_KEYS.question]: '',
        [TEST_QUESTION_KEYS.answersType]: TEST_QUESTION_ANSWER_TYPE_MAP.text,
        [TEST_QUESTION_KEYS.answers]: [],
        [TEST_QUESTION_KEYS.id]: nanoid(),
    };
};

const getInitialQuestionAnswerConfigs = () => {
    return {
        [TEST_QUESTION_ANSWER_KEYS.id]: nanoid(),
    };
};

const reducer = (testConfigDraft, action) => {
    const payload = action.payload;
    switch (action.type) {
        case dispatchCommands.updateGeneralProperty: {
            testConfigDraft[TEST_KEYS.general][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.toggleResultRange: {
            if (typeof payload.resultRangeIndex === 'number') {
                testConfigDraft[TEST_KEYS.general][TEST_GENERAL_KEYS.results].splice(payload.resultRangeIndex, 1);
            } else {
                testConfigDraft[TEST_KEYS.general][TEST_GENERAL_KEYS.results].push(getInitialResultRangeConfigs());
            }
        }
            break;
        case dispatchCommands.updateResultRangeProperty: {
            testConfigDraft[TEST_KEYS.general][TEST_GENERAL_KEYS.results][payload.resultRangeIndex][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.toggleQuestion: {

            if (typeof payload.questionIndex === 'number') {
                testConfigDraft[TEST_KEYS.questions].splice(payload.questionIndex, 1);
            } else {
                testConfigDraft[TEST_KEYS.questions].push(getInitialQuestionConfigs());
            }
        }
            break;
        case dispatchCommands.updateQuestionProperty: {
            testConfigDraft[TEST_KEYS.questions][payload.questionIndex][payload.propertyName] = payload.newValue;
        }
            break;
        case dispatchCommands.toggleQuestionAnswer: {

            if (typeof payload.questionIndex === 'number' && typeof payload.answerIndex === 'number') {
                testConfigDraft[TEST_KEYS.questions][payload.questionIndex][TEST_QUESTION_KEYS.answers].splice(payload.answerIndex, 1);
            } else {
                testConfigDraft[TEST_KEYS.questions][payload.questionIndex][TEST_QUESTION_KEYS.answers].push(getInitialQuestionAnswerConfigs());
            }
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
    const [testConfigs, dispatch] = useImmerReducer(reducer, null, getInitialTestConfigs);

    React.useEffect(() => {
        dispatch({
            type: dispatchCommands.setTestConfigs,
            payload: {newTestConfigs: getItemFromStorage(CREATE_TEST_IN_PROCESS_KEY) || getInitialTestConfigs()},
        });
    }, [dispatch]);
    React.useEffect(() => {
        setItemToStorage(CREATE_TEST_IN_PROCESS_KEY, testConfigs);
    }, [testConfigs]);

    const updateGeneralProperty = React.useCallback(({propertyName, newValue}) => {
        dispatch({type: dispatchCommands.updateGeneralProperty, payload: {propertyName, newValue}});
    }, [dispatch]);

    const toggleResultRange = React.useCallback(({resultRangeIndex = false}) => {
        dispatch({type: dispatchCommands.toggleResultRange, payload: {resultRangeIndex}});
    }, [dispatch]);

    const updateResultRangeProperty = React.useCallback(({propertyName, newValue, resultRangeIndex}) => {
        dispatch({
            type: dispatchCommands.updateResultRangeProperty,
            payload: {propertyName, newValue, resultRangeIndex},
        });
    }, [dispatch]);

    const toggleQuestion = React.useCallback(({questionIndex = false}) => {
        dispatch({type: dispatchCommands.toggleQuestion, payload: {questionIndex}});
    }, [dispatch]);

    const updateQuestionProperty = React.useCallback(({propertyName, newValue, questionIndex}) => {
        dispatch({type: dispatchCommands.updateQuestionProperty, payload: {propertyName, newValue, questionIndex}});
    }, [dispatch]);

    const toggleQuestionAnswer = React.useCallback(({questionIndex = false, answerIndex = false}) => {
        dispatch({type: dispatchCommands.toggleQuestionAnswer, payload: {questionIndex, answerIndex}});
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
        toggleResultRange,
        updateResultRangeProperty,
        toggleQuestion,
        updateQuestionProperty,
        toggleQuestionAnswer,
        updateQuestionAnswerProperty,
    };
};