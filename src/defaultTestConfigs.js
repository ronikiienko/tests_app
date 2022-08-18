const defaultTestConfigs =
    {
        general: {
            testName: 'Example test',
            testDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specime',
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
// const defaultTestConfigs = {"general":{"testName":"Potato test","testDescription":"Are you a potato?","results":[{"min":"0","max":"16","resultName":"You aren't potato","resultDescription":"You probably a bad person, and I don't really think we could talk, you're sooooooo awful person,bad bad"},{"min":"16","max":"20","resultName":"You are almost potato","resultDescription":"I think I could say that you are potato, but... You're not truly potato, maybe with time you could join our team, but not now. Also, you are normal person. Just a good guy, so-so, not awful,and not so cool. That's it. About could we be friends? Maybe? Have no idea "},{"min":"21","max":"10000","resultName":"YOU'RE POTATO!!","resultDescription":"Amazing! You're soo cool! You could join our team if you want, it's oowww IT'S SOO COOL. You are the best person of persons, that's great achievement! We totally could be friends, im sure, you're a good boy "}]},"questions":[{"question":"Cats...","answersType":"radio","answers":[{"answer":"cuties ","mark":"5"},{"answer":"i don't like cats","mark":"0"},{"answer":"doggs better ","mark":"0"},{"answer":"I love capybaras ","mark":"2"}]},{"question":"Eeooowww ","answersType":"radio","answers":[{"answer":"Uuuaaww","mark":"0"},{"answer":"Eeooowww ","mark":"0"},{"answer":"Eeeeaaaaooouuuuww ","mark":"1"}]},{"question":"Meow?","answersType":"radio","answers":[{"answer":"Meow meow ","mark":"1"},{"answer":"K?","mark":"5"},{"answer":"Meeoooow","mark":"1"},{"answer":"Uuuaaww ","mark":"1"},{"answer":"nothing?","mark":"0"}]},{"question":"Now serious question. Neon...","answersType":"text","answers":[{"answer":"genesis evangelion","mark":"10"}]},{"question":"When you fall asleep?","answersType":"checkbox","answers":[{"answer":"21-00","mark":"0"},{"answer":"00-01","mark":"1"},{"answer":"02-04","mark":"2"}]},{"question":"Before I go sleep...","answersType":"checkbox","answers":[{"answer":"I'll watch something","mark":"5"},{"answer":"Play genshin 199281901828 hours","mark":"5"},{"answer":"Nothing, just sleep ","mark":"0"},{"answer":"Eat something?","mark":"1"},{"answer":"Watch cats because they're soo good, nice, cute, adorable, amazing, incredible, I love them","mark":"5"},{"answer":"I'll wish meowk good night, to have bonne nuit, beecaausee im a good boy","mark":"5"},{"answer":"Im not a good boy, but I'll wish meowk good night, just because ","mark":"0"}]},{"question":"Sooo?","answersType":"checkbox","answers":[{"answer":"So?","mark":"1"},{"answer":"What???","mark":"0"},{"answer":"Am I potato??? *emoji with big eyes, that should be cute*","mark":"5"},{"answer":"Fladaу flyday chinatown ","mark":"5"}]},{"question":"Who's your fav genshin character?","answersType":"radio","answers":[{"answer":"Violet chulochki archon (im a trans-include lesbian)","mark":"1"},{"answer":"Soft horny mommy","mark":"0"},{"answer":"Horny mommy ","mark":"0"},{"answer":"Girl with a bantic na pis'ke","mark":"0"},{"answer":"Yoimiya, cause she's cool and it's meowk's main","mark":"5"},{"answer":"Blue... Eeee... Eew... Aaa.... Yeah","mark":"0"},{"answer":"heidzou, that one that Lenin, sss!","mark":"0"}]},{"question":"Any number?","answersType":"number","answers":[{"min":"0","max":"12","mark":"1"},{"min":"13","max":"33","mark":"5"},{"min":"34","max":"50","mark":"1"},{"min":"51","max":"10000","mark":"1"}]},{"question":"Fav drink?","answersType":"radio","answers":[{"answer":"Tea","mark":"1"},{"answer":"Water ","mark":"1"},{"answer":"Coffee ","mark":"1"},{"answer":"Pls stop just say it already........","mark":"0"}]},{"question":"Cats! Cats are cute when...","answersType":"checkbox","answers":[{"answer":"Sleep ","mark":"1"},{"answer":"Angry ","mark":"1"},{"answer":"Playing ","mark":"1"},{"answer":"Crazy?","mark":"1"},{"answer":"Eating ","mark":"1"}]},{"question":"How do you think, are you potato?","answersType":"radio","answers":[{"answer":"Yes","mark":"1"},{"answer":"No","mark":"1"},{"answer":"Idk","mark":"0"},{"answer":"Well, maybe it's you should tell me????","mark":"0"},{"answer":"Eeooowww ","mark":"0"},{"answer":"Meow ","mark":"1"}]},{"question":"Tired?","answersType":"radio","answers":[{"answer":"Yes((","mark":"0"},{"answer":"No, it's ok","mark":"5"},{"answer":"Meow ","mark":"10"}]}]}
export default defaultTestConfigs;
