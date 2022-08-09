import {nanoid} from 'nanoid';
import React from 'react';


export default function Answers({questionIndex, setMarks, isInProcess, questionData}) {
    const answersType = questionData.answersType;
    const answersData = questionData.answers;

    const [userAnswerMark, setUserAnswerMark] = React.useState('');
    const [userAnswers, setUserAnswers] = React.useState(['']);
    React.useEffect(() => {
        console.log(userAnswers);
    }, [userAnswers]);

    function handleChange(event, checkboxNumber) {
        setUserAnswers(prevAnswer => {
            let newAnswer = [...prevAnswer];
            if (answersType === 'checkbox') {
                if (newAnswer[checkboxNumber] === event.target.value) {
                    newAnswer[checkboxNumber] = '';
                    return newAnswer;
                } else {
                    let realAnswerLength = 0;
                    for (let i = 0; i < newAnswer.length; i++) {
                        if (newAnswer[i] !== '') {
                            realAnswerLength++;
                        }
                    }

                    if (realAnswerLength >= questionData.maxChecked) {
                        newAnswer = [...newAnswer];
                    } else {
                        newAnswer[checkboxNumber] = event.target.value;
                    }
                    return newAnswer;

                }
            } else {
                newAnswer[0] = event.target.value;
                return newAnswer;
            }

        });
    }

    function checkIfAnswerChosen(answerData) {
        switch (answersType) {
            case 'checkbox':
                return (userAnswers.includes(answerData.answer));
            case 'radio':
                return (answerData.answer.toString() === userAnswers[0]);
            case 'number':
                return (userAnswers[0] <= answerData.max && userAnswers[0] >= answerData.min);
            case 'text':
                return (answerData.answer.toLowerCase().replace(/\s+/g, '') === userAnswers[0].toLowerCase().replace(/\s+/g, ''));
        }
    }

    React.useEffect(() => {
        let mark = 0;
        answersData.map((answerData, index) => {
            if (checkIfAnswerChosen(answerData)) {
                mark = mark + Number(answerData.mark);
            }
        });
        setUserAnswerMark(mark);
    }, [userAnswers]);

    let revealedAnswers = answersData.map((answerData, index) => {
        let isChosen = checkIfAnswerChosen(answerData);
        return (
            <p key={index}>
                {`${answerData.mark} ${answerData.mark === 1 ? 'point' : 'points'}:
                       ${answersType === 'number' ? `${answerData.min} - ${answerData.max}` : answerData.answer}
                       ${isChosen ? 'chosen' : ''}`}
            </p>
        );
    });

    React.useEffect(() => {
        if (userAnswerMark !== '') {
            setMarks((prevMarks) => {
                let newMarks = [...prevMarks];
                newMarks[questionIndex] = userAnswerMark;
                return newMarks;
            });
        }
    }, [userAnswerMark]);

    React.useEffect(() => {
        if (isInProcess) {
            setUserAnswers(['']);
        }
    }, [isInProcess]);


    if (answersType === 'number' || answersType === 'text') {
        return (
            <>
                <input
                    type={answersType}
                    value={userAnswers[0]}
                    onChange={(event) => handleChange(event)}
                    disabled={!isInProcess}
                />
                {!isInProcess && revealedAnswers}
            </>
        );
    }
    if (answersType === 'radio' || answersType === 'checkbox') {
        return (
            <>
                {answersType === 'checkbox' && <p>Choose {questionData.maxChecked} answers</p>}
                {answersData.map((answerData, index) => {
                    const id = nanoid();
                    let answerText = answerData.answer;
                    return (
                        <React.Fragment key={id}>
                            <input
                                type={answersType}
                                id={id}
                                name={questionIndex}
                                value={answerText}
                                checked={userAnswers.includes(answerText.toString())}
                                onChange={(event) => handleChange(event, index)}
                                disabled={!isInProcess}
                            />
                            <label htmlFor={id}>{answerText}</label>
                        </React.Fragment>
                    );
                })

                }
                {!isInProcess && revealedAnswers}
            </>
        );
    }
}