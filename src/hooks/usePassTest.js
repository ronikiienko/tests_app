import React, {useReducer} from 'react';


const dispatchCommands = {
    updateAnswer: 'updateQuestion',
    updateCheckboxAnswer: 'updateCheckboxAnswer',
    updateNumberAnswer: 'updateNumberAnswer',
    setAnswers: 'setAnswers',
};

const reducer = (answersState, action) => {
    console.log(action);
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
            let answeredCount = 0;
            if (newAnswer?.length) {
                newAnswer.forEach(element => {
                    if (element) answeredCount++;
                });
            }
            if (answeredCount < action.maxChecked && action.newAnswer) {
                newAnswer[action.checkboxIndex] = action.newAnswer;
                newAnswers[action.questionIndex] = newAnswer;
                return newAnswers;
            } else {
                return newAnswers;
            }
        }
        case dispatchCommands.setAnswers: {
            return action.newAnswers;
        }
    }
};
export const usePassTest = (defaultAnswers) => {
    const [answers, dispatch] = useReducer(reducer, defaultAnswers);

    const updateAnswer = React.useCallback((newAnswer, questionIndex) => {
        dispatch({type: dispatchCommands.updateAnswer, newAnswer, questionIndex});
    }, []);
    const updateNumberAnswer = React.useCallback((newAnswer, questionIndex) => {
        dispatch({type: dispatchCommands.updateNumberAnswer, newAnswer, questionIndex});
    }, []);
    const updateCheckboxAnswer = React.useCallback((newAnswer, questionIndex, checkboxIndex, maxChecked) => {
        dispatch({type: dispatchCommands.updateCheckboxAnswer, newAnswer, questionIndex, checkboxIndex, maxChecked});
    }, []);
    const setAnswers = React.useCallback((newAnswers) => {
        dispatch({type: dispatchCommands.setAnswers, newAnswers});
    }, []);
    return {answers, setAnswers, updateAnswer, updateCheckboxAnswer, updateNumberAnswer};
};