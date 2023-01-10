import React, {useReducer} from 'react';
import {TEST_KEYS} from '../consts.js';


const dispatchCommands = {
    updateQuestion: 'updateQuestion',
};

const initialTestConfigs = {};

const reducer = (testConfigState, action) => {
    switch (action.type) {
        case dispatchCommands.updateQuestion: {
            const newTestConfigState = {...testConfigState};
            const newTestQuestions = [...testConfigState[TEST_KEYS.questions]];

        }
    }
};
export const useCreateTest = () => {
    const [testConfigs, dispatch] = useReducer(reducer, initialTestConfigs);

    const updateQuestionProperty = React.useCallback((questionIndex, questionProperty) => {
        dispatch({type: dispatchCommands.updateQuestion, questionIndex, questionProperty});
    }, []);
    return {testConfigs, updateQuestionProperty, addQuestion};
};