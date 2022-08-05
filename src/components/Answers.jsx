import {nanoid} from 'nanoid';
import React from 'react';


export default function Answers({answersType, answersData, inputsName, questionIndex, setMarks, isInProcess}) {


    const [userAnswerMark, setUserAnswerMark] = React.useState('');
    const [userAnswers, setUserAnswers] = React.useState(Array(answersData.length).join('.').split('.'));

    function handleChange(event, checkboxNumber) {
        setUserAnswers(prevAnswer => {
            if (answersType === 'checkbox') {
                let newAnswer = [...prevAnswer];
                if (newAnswer[checkboxNumber] === event.target.value) {
                    newAnswer[checkboxNumber] = '';
                } else {
                    newAnswer[checkboxNumber] = event.target.value;
                }
                return newAnswer;
            } else {
                let newAnswer = [...prevAnswer];
                newAnswer[0] = event.target.value;
                return newAnswer;
            }

        });
    }

    React.useEffect(() => {
        let mark = 0;
        answersData.map((answerData, index) => {
            switch (answersType) {
                case 'checkbox':
                    if (answerData.answer === userAnswers[index]) {
                        mark = mark + answerData.mark;
                    }
                    break;
                case 'radio':
                    if (answerData.answer.toString() === userAnswers[0]) {
                        mark = mark + answerData.mark;
                    }
                    break;
                case 'number':
                    if (userAnswers[0] <= answerData.max && userAnswers[0] >= answerData.min) {
                        mark = mark + answerData.mark;
                    }
                    break;
                case 'text':
                    if (answerData.answer.toLowerCase().replace(/\s+/g, '') === userAnswers[0].toLowerCase().replace(/\s+/g, '')) {
                        mark = mark + answerData.mark;
                    }

            }
        });
        setUserAnswerMark(mark);
    }, [userAnswers]);

    let revealedAnswers = answersData.map((answerData, index) => {
        let isChosen;
        switch (answersType) {
            case 'number':
                isChosen = userAnswers[0] <= answerData.max && userAnswers[0] >= answerData.min;
                break;
            case 'checkbox':
                isChosen = userAnswers.includes(answerData.answer);
                break;
            case 'radio':
                isChosen = Number(userAnswers[0]) === answerData.answer;
                break;
            case 'text':
                isChosen = userAnswers[0].toLowerCase().replace(/\s+/g, '') === answerData.answer.toLowerCase().replace(/\s+/g , '');
        }
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
            setUserAnswers(Array(answersData.length).join('.').split('.'));
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
                {answersData.map((answerData, index) => {
                    const id = nanoid();
                    let answerText = answerData.answer;
                    return (
                        <React.Fragment key={id}>
                            <input
                                type={answersType}
                                id={id}
                                name={inputsName}
                                value={answerText}
                                checked={answersType === 'radio' ? userAnswers[0] === answerText.toString() : userAnswers.includes(answerText.toString())}
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