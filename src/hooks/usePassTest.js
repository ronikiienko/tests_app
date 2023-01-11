import React, {useReducer} from 'react';


const dispatchCommands = {
    updateAnswer: 'updateQuestion',
    updateCheckboxAnswer: 'updateCheckboxAnswer',
    updateNumberAnswer: 'updateNumberAnswer',
    setAnswers: 'setAnswers',
};

const initialAnswers = [];

const reducer = (answersState, action) => {
    switch (action.type) {
        case dispatchCommands.updateAnswer: {
            let newAnswers = [...answersState];
            newAnswers[action.questionIndex] = [action.newAnswer.toString()];
            return newAnswers;
        }
        case dispatchCommands.updateNumberAnswer: {
            let newAnswers = [...answersState];
            newAnswers[action.questionIndex] = [Number(action.newAnswer)];
            return newAnswers;
        }
        case dispatchCommands.updateCheckboxAnswer: {
            let newAnswers = [...answersState];
            let newAnswer = [...newAnswers[action.questionIndex]];
            newAnswer[action.answerIndex] = action.newAnswer;
            newAnswers[action.questionIndex] = newAnswer;
            return newAnswers;
        }
        case dispatchCommands.setAnswers: {
            return action.newAnswers;
        }
    }
};
export const usePassTest = () => {
    const [answers, dispatch] = useReducer(reducer, initialAnswers);

    const updateAnswer = React.useCallback((newAnswer, questionIndex) => {
        dispatch({type: dispatchCommands.updateAnswer, newAnswer, questionIndex});
    }, []);
    const updateNumberAnswer = React.useCallback((newAnswer, questionIndex) => {
        dispatch({type: dispatchCommands.updateAnswer, newAnswer, questionIndex});
    }, []);
    const updateCheckboxAnswer = React.useCallback((newAnswer, questionIndex, answerIndex) => {
        dispatch({type: dispatchCommands.updateAnswer, newAnswer, questionIndex, answerIndex});
    }, []);
    const setAnswers = React.useCallback((newAnswers) => {
        dispatch({type: dispatchCommands.setAnswers, newAnswers});
    }, []);
    return {answers, setAnswers, updateAnswer, updateCheckboxAnswer, updateNumberAnswer};
};