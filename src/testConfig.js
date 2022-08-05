const testConfigs =
    {
        general: {
            testName: 'Example test',
            testDescription: 'It is my example test',
            results:
                [
                    {
                        min: 0,
                        max: 4,
                        resultName: 'Shit',
                        resultDescription: 'You are shit',
                    },
                    {
                        min: 5,
                        max: 9,
                        resultName: 'Bad',
                        resultDescription: 'You are bad',
                    },
                    {
                        min: 10,
                        max: Infinity,
                        resultName: 'Godlike',
                        resultDescription: 'You are godlike',
                    },

                ],
        },
        questions:
            [
                {
                    question: 'How old are you?',
                    answersType: 'number',
                    answers:
                        [
                            {
                                min: 10,
                                max: 20,
                                mark: 2,
                            },
                            {
                                min: 21,
                                max: 40,
                                mark: 1,
                            },
                            {
                                min: 41,
                                max: Infinity,
                                mark: 3,
                            },
                        ],
                },


                {
                    question: '2+4',
                    answersType: 'radio',
                    answers:
                        [
                            {
                                answer: 5,
                                mark: 0,
                            },
                            {
                                answer: 6,
                                mark: 3,
                            },
                            {
                                answer: 3,
                                mark: 0,
                            },
                        ],
                },


                {
                    question: 'Which of these are animals?',
                    answersType: 'checkbox',
                    answers:
                        [
                            {
                                answer: 'Racoon',
                                mark: 1,
                            },
                            {
                                answer: 'Squirell',
                                mark: 1,
                            },
                            {
                                answer: 'Bottle',
                                mark: 0,
                            },

                            {
                                answer: 'Suzuki',
                                mark: 0,
                            }

                        ],
                },


                {
                    question: 'Best game ever?',
                    answersType: 'text',
                    answers:
                        [
                            {
                                answer: 'Fallout4',
                                mark: 5,
                            },
                            {
                                answer: 'Terraria',
                                mark: 1,
                            },
                            {
                                answer: 'Minecraft',
                                mark: 0,
                            },
                        ],
                },


            ],
    };
export default testConfigs;
