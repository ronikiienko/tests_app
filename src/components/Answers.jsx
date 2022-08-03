import {nanoid} from 'nanoid';
import React from 'react';
import {MarksContext} from './App.jsx';


export default function Answers({answersType, answersData, inputsName, questionIndex}) {

    const setMark = React.useContext(MarksContext);


    const [userAnswerMark, setUserAnswerMark] = React.useState('');
    const [userAnswers, setUserAnswers] = React.useState(Array(answersData.length).join('.').split('.'));

    console.log(userAnswers, userAnswerMark);
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
                } else  {
                    let newAnswer = [...prevAnswer];
                    newAnswer[0] = event.target.value;
                    return newAnswer;
                }

            });
    }

    function handleAnswers () {
        if (userAnswers[0] === '') {
            return
        }
        let mark = 0;
        answersData.map((answerData, index) => {
            if (answersType === 'checkbox') {
                if (answerData.answer === userAnswers[index]) {
                    mark = mark + answerData.mark;
                }
            } else if (answersType === 'radio') {
                if (answerData.answer.toString() === userAnswers[0]) {
                    mark = mark + answerData.mark;
                }
            } else if (answersType === 'number') {
                if (userAnswers[0] < answerData.max && userAnswers[0] > answerData.min) {
                    mark = mark + answerData.mark;
                }
            } else if (answersType === 'text') {
                if (answerData.answer.toLowerCase() === userAnswers[0].toLowerCase()) {
                    mark = mark + answerData.mark
                }
            }
        })
        setUserAnswerMark(mark);
    }


    React.useEffect(() => {
        handleAnswers();
    }, [userAnswers]);

    function setMarkToMarksArray () {
        if (userAnswerMark === '') {
            return
        }
        setMark((prevMarks) => {
            let newMarks = [...prevMarks];
            newMarks[questionIndex] = userAnswerMark;
            return newMarks;
        })
    }
    React.useEffect(() => {
        // setMarkToMarksArray()
        console.log(userAnswerMark);
    }, [userAnswerMark])



    if (answersType === 'number') {
        return <input type={'number'} value={userAnswers[0]} onChange={(event) => handleChange(event)}/>;
    }
    if (answersType === 'text') {
        return <input type={'text'} value={userAnswers[0]} onChange={(event) => handleChange(event)}/>;
    }
    if (answersType === 'radio' || answersType === 'checkbox') {
        return answersData.map((answerData, index) => {
            let answerText = answerData.answer;
            const id = nanoid();
            if (answersType === 'radio') {
                return (
                    <React.Fragment key={id}>
                        <input
                            type="radio"
                            id={id}
                            name={inputsName}
                            value={answerText}
                            checked={userAnswers[0] === answerText.toString()}
                            onChange={(event) => handleChange(event)}
                        />
                        <label htmlFor={id}>{answerText}</label>
                    </React.Fragment>

                );
            }
            if (answersType === 'checkbox') {
                return (
                    <React.Fragment key={id}>
                        <input
                            type="checkbox"
                            id={id}
                            name={inputsName}
                            value={answerText}
                            checked={userAnswers.includes(answerText.toString())}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <label htmlFor={id}>{answerText}</label>
                    </React.Fragment>

                );
            }
        });
    }
}