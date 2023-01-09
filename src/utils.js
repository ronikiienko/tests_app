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


export const parseJSON = (jsonString, decode = false) => {
    try {
        if (decode) {
            return JSON.parse(decodeString(jsonString));
        } else {
            return JSON.parse(jsonString);
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
};
export const getItemFromStorage = (itemName, decode) => {
    try {
        if (decode) {
            return parseJSON(window.localStorage.getItem(itemName), true);
        } else {
            return parseJSON(window.localStorage.getItem(itemName));
        }
    } catch (e) {
        console.log(e, 'b');
        return undefined;
    }
};

export const setItemToStorage = (itemName, itemData, encode = false) => {
    try {
        let stringToSave = JSON.stringify(itemData);
        if (encode) {
            stringToSave = encodeString(stringToSave);
        }
        return window.localStorage.setItem(itemName, stringToSave);
    } catch (e) {
        return undefined;
    }
};

const encodeString = (string) => {
    if (!string) return;

    let result = '';
    for (let i = 0; i < string.length; i++) {
        const charcode = string.charCodeAt(i) - 2;
        result += String.fromCharCode(charcode);
    }
    return result;
};

const decodeString = (string) => {
    if (!string) return;

    let result = '';
    for (let i = 0; i < string.length; i++) {
        const charcode = string.charCodeAt(i) + 2;
        result += String.fromCharCode(charcode);
    }
    return result;
};

export const checkQuestion = (userQuestionAnswers, question) => {
    const questionAnswerType = question[TEST_QUESTION_KEYS.answersType];
    const questionAnswers = question?.[TEST_QUESTION_KEYS.answers];
    let questionMark = 0;
    let checkedArray = [];
    if (!questionAnswers?.length || !userQuestionAnswers?.length) return {mark: 0, checkedArray};
    switch (questionAnswerType) {
        case TEST_QUESTION_ANSWER_TYPE_MAP.number: {
            const userAnswer = userQuestionAnswers[0];
            for (const answer of questionAnswers) {
                if (answer[TEST_QUESTION_ANSWER_KEYS.min] <= userAnswer && answer[TEST_QUESTION_ANSWER_KEYS.max] >= userAnswer) {
                    checkedArray.push(true);
                    questionMark = questionMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    break;
                }
                checkedArray.push(false);
            }
        }
            break;
        case TEST_QUESTION_ANSWER_TYPE_MAP.text: {
            const userAnswer = userQuestionAnswers[0];
            for (const answer of questionAnswers) {
                if (answer[TEST_QUESTION_ANSWER_KEYS.answer].toLowerCase().replace(/\s/g, '') === userAnswer.toLowerCase().replace(/\s/g, '')) {
                    checkedArray.push(true);
                    questionMark = questionMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    break;
                }
                checkedArray.push(false);
            }
        }
            break;
        case TEST_QUESTION_ANSWER_TYPE_MAP.radio: {
            const userAnswer = userQuestionAnswers[0];
            for (const answer of questionAnswers) {
                if (answer[TEST_QUESTION_ANSWER_KEYS.answer].toString() === userAnswer.toString()) {
                    checkedArray.push(true);
                    questionMark = questionMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                    break;
                }
                checkedArray.push(false);
            }
        }
            break;
        case TEST_QUESTION_ANSWER_TYPE_MAP.checkbox: {
            const userAnswers = userQuestionAnswers;
            questionAnswers.forEach((answer, index) => {
                if (userAnswers[index]) {
                    checkedArray.push(true);
                    questionMark = questionMark + answer[TEST_QUESTION_ANSWER_KEYS.mark];
                } else {
                    checkedArray.push(false);
                }
            });
        }
            break;
    }
    return {mark: questionMark, checkedArray};
};
export const checkTest = (answers, testConfigs) => {
    let overallMark = 0;
    testConfigs[TEST_KEYS.questions].forEach((question, index) => {
        const userQuestionAnswers = answers[index];
        if (!userQuestionAnswers) return;
        const {mark} = checkQuestion(userQuestionAnswers, question);
        overallMark = overallMark + mark || 0;
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