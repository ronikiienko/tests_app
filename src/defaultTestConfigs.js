import {
    TEST_GENERAL_KEYS,
    TEST_GENERAL_RESULT_RANGE_KEYS,
    TEST_KEYS,
    TEST_QUESTION_ANSWER_KEYS,
    TEST_QUESTION_ANSWER_TYPE_MAP,
    TEST_QUESTION_KEYS,
} from './consts.js';


const defaultTestConfigs =
    {
        [TEST_KEYS.general]: {
            [TEST_GENERAL_KEYS.testName]: 'Default test',
            [TEST_GENERAL_KEYS.testDescription]: 'It\'s default test. You can create new in \'Create test\' tab or import text file, exported from \'Create test\' tab by pressing \'Import new test\' button',
            [TEST_GENERAL_KEYS.results]:
                [
                    {
                        [TEST_GENERAL_RESULT_RANGE_KEYS.min]: 0,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.max]: 4,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultName]: 'Shit',
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]: 'You are shit',
                    },
                    {
                        [TEST_GENERAL_RESULT_RANGE_KEYS.min]: 5,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.max]: 9,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultName]: 'Bad',
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]: 'You are bad',
                    },
                    {
                        [TEST_GENERAL_RESULT_RANGE_KEYS.min]: 10,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.max]: 10000000000,
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultName]: 'Godlike',
                        [TEST_GENERAL_RESULT_RANGE_KEYS.resultDescription]: 'You are godlike',
                    },

                ],
        },
        [TEST_KEYS.questions]:
            [
                {
                    [TEST_QUESTION_KEYS.question]: 'How old are you?',
                    [TEST_QUESTION_KEYS.answersType]: TEST_QUESTION_ANSWER_TYPE_MAP.number,
                    [TEST_QUESTION_KEYS.answers]:
                        [
                            {
                                [TEST_QUESTION_ANSWER_KEYS.min]: 10,
                                [TEST_QUESTION_ANSWER_KEYS.max]: 20,
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 2,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.min]: 21,
                                [TEST_QUESTION_ANSWER_KEYS.max]: 40,
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 1,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.min]: 41,
                                [TEST_QUESTION_ANSWER_KEYS.max]: 10000000000000,
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 3,
                            },
                        ],
                },


                {
                    [TEST_QUESTION_KEYS.question]: '2+4',
                    [TEST_QUESTION_KEYS.answersType]: TEST_QUESTION_ANSWER_TYPE_MAP.radio,
                    [TEST_QUESTION_KEYS.answers]:
                        [
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: '5',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 0,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: '6',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 3,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: '3',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 0,
                            },
                        ],
                },
                {
                    [TEST_QUESTION_KEYS.question]: 'Їжа😢😢😢😢😢😢?',
                    [TEST_QUESTION_KEYS.answersType]: TEST_QUESTION_ANSWER_TYPE_MAP.checkbox,
                    [TEST_QUESTION_KEYS.maxChecked]: 3,
                    [TEST_QUESTION_KEYS.answers]:
                        [
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Bakaka',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 1,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Sumatra',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 1,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'chyina',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 0,
                            },

                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Bronski beat',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 0,
                            },

                        ],
                },

                {
                    [TEST_QUESTION_KEYS.question]: 'Best game ever?',
                    [TEST_QUESTION_KEYS.answersType]: TEST_QUESTION_ANSWER_TYPE_MAP.text,
                    [TEST_QUESTION_KEYS.answers]:
                        [
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Fallout4',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 5,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Terraria',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 1,
                            },
                            {
                                [TEST_QUESTION_ANSWER_KEYS.answer]: 'Minecraft',
                                [TEST_QUESTION_ANSWER_KEYS.mark]: 0,
                            },
                        ],
                },
            ],
    };
export default defaultTestConfigs;
