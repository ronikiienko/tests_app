// const array = [];
// for (let i = 0; i < 1000; i++) {
//     array.push(Number(Math.random().toFixed(3)) * 1000);
// }
// const largestNumbersFromArray = [null];
// array.forEach((number, index) => {
//     if (largestNumbersFromArray.length >= 10) {
//         let smallestNumberInfo = {
//             index: null,
//             number: null,
//         };
//         for (let i = 0; i < largestNumbersFromArray.length; i++) {
//             if (
//                 largestNumbersFromArray[i] < number &&
//                 number > smallestNumberInfo.number
//             ) {
//                 smallestNumberInfo.index = i;
//                 smallestNumberInfo.number = number;
//             }
//         }
//         if (smallestNumberInfo.number)
//             largestNumbersFromArray[smallestNumberInfo.index] =
//                 smallestNumberInfo.number;
//     } else {
//         for (const number1 of largestNumbersFromArray) {
//             console.log('he');
//             if (number > number1) {
//                 largestNumbersFromArray.push(number);
//                 break;
//             }
//         }
//     }
// });

import {
    TEST_GENERAL_KEYS,
    TEST_GENERAL_RESULT_RANGE_KEYS,
    TEST_KEYS,
    TEST_QUESTION_ANSWER_KEYS,
    TEST_QUESTION_ANSWER_TYPE_MAP,
    TEST_QUESTION_KEYS,
} from './consts.js';


export const JSONParseCatch = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        return undefined;
    }
};
export const checkTest = (answers, testConfigs) => {
    let overallMark = 0;
    testConfigs[TEST_KEYS.questions].forEach((question, index) => {
        const questionAnswerType = question[TEST_QUESTION_KEYS.answersType];
        const questionAnswers = question[TEST_QUESTION_KEYS.answers];
        const userQuestionAnswers = answers[index];
        if (!userQuestionAnswers) return;
        switch (questionAnswerType) {
            case TEST_QUESTION_ANSWER_TYPE_MAP.number: {
                const userAnswer = Number(userQuestionAnswers[0]);
                questionAnswers.forEach(answer => {
                    if (answer[TEST_QUESTION_ANSWER_KEYS.min] <= userAnswer && answer[TEST_QUESTION_ANSWER_KEYS.max] >= userAnswer) {
                        overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    }
                });
            }
                break;
            case TEST_QUESTION_ANSWER_TYPE_MAP.text: {
                const userAnswer = userQuestionAnswers[0];
                questionAnswers.forEach(answer => {
                    if (answer[TEST_QUESTION_ANSWER_KEYS.answer].toLowerCase().replace(/\s/g, '') === userAnswer.toLowerCase().replace(/\s/g, '')) {
                        overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    }
                });
            }
                break;
            case TEST_QUESTION_ANSWER_TYPE_MAP.radio: {
                const userAnswer = userQuestionAnswers[0];
                questionAnswers.forEach(answer => {
                    if (answer[TEST_QUESTION_ANSWER_KEYS.answer].toString() === userAnswer.toString()) {
                        overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    }
                });
            }
                break;
            case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
                const userAnswers = userQuestionAnswers;
                questionAnswers.forEach((answer, index) => {
                    if (!answer || !userAnswers[index]) return;
                    if (userAnswers[index]) {
                        overallMark = overallMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    }
                });
            }
                break;
        }
    });
    let resultName;
    let resultDescription;
    testConfigs[TEST_KEYS.general][TEST_GENERAL_KEYS.results].forEach(result => {
        if (result[TEST_GENERAL_RESULT_RANGE_KEYS.min] <= overallMark && result[TEST_GENERAL_RESULT_RANGE_KEYS.max] >= overallMark) {
            resultName = result[TEST_GENERAL_RESULT_RANGE_KEYS.resultName];
            resultDescription = result[TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription];
        }
    });
    return {overallMark, resultName, resultDescription};
};