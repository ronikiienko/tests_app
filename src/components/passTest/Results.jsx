import React from 'react';
import {TEST_KEYS, TEST_QUESTION_KEYS} from '../../consts.js';


const checkTest = (answers, testConfigs) => {
    let overallMark = 0;
    testConfigs[TEST_KEYS.questions].forEach((question, index) => {
        const questionAnswerType = question[TEST_QUESTION_KEYS.answersType];
        const questionAnswers = question[TEST_QUESTION_KEYS.answers];
        const userQuestionAnswers = answers[index];
        console.log(questionAnswerType, questionAnswers, userQuestionAnswers);
        if (!userQuestionAnswers) return;
        console.log(userQuestionAnswers);
        // switch (questionAnswerType) {
        //     case TEST_QUESTION_ANSWER_TYPE_MAP.number: {
        //         const userAnswer = Number(userQuestionAnswers[0])
        //         questionAnswers.forEach(answer => {
        //             if (answer[TEST_QUESTION_ANSWER_KEYS.min] <= userAnswer && answer[TEST_QUESTION_ANSWER_KEYS.max] >= userAnswer) {
        //                 overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark]
        //             }
        //         })
        //     }
        //     break;
        //     case TEST_QUESTION_ANSWER_TYPE_MAP.text: {
        //         const userAnswer = userQuestionAnswers[0]
        //         questionAnswers.forEach(answer => {
        //             if (answer.toLowerCase().replace(/\s/g, '') === userAnswer.toLowerCase().replace(/\s/g, '')) {
        //                 overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark]
        //             }
        //         })
        //     }
        //     break;
        //     case TEST_QUESTION_ANSWER_TYPE_MAP.radio: {
        //         const userAnswer = userQuestionAnswers[0]
        //         questionAnswers.forEach(answer => {
        //             if (answer.toString() === userAnswer.toString()) {
        //                 overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark]
        //             }
        //         })
        //     }
        //     break;
        //     case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
        //         const userAnswers = userQuestionAnswers
        //         questionAnswers.forEach((answer, index) => {
        //             if (answer.toString() === userAnswers[index].toString()) {
        //                 overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark]
        //             }
        //         })
        //     }
        //     break;
        // }
    });
    console.log(overallMark);
    setTimeout(() => console.log(overallMark), 3000);
};

export function Results({answers, testConfigs}) {
    checkTest(answers, testConfigs);
    return (
        <>
            <h2>hello</h2>
        </>

    );
}