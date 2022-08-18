import {FormControlLabel, Radio, RadioGroup, TextField} from '@mui/material';
import React from 'react';
import CreateAnswers from './Create-Answers.jsx';


export default function CreateQuestion({questionIndex, setQuestions, saveSignal, configObject}) {
    const [answers, setAnswers] = React.useState([]);
    const [questionGeneral, setQuestionGeneral] = React.useState({question: '', answersType: ''});
    const renderCount = React.useRef(0);
    React.useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });
    console.log(renderCount.current);
    console.log('answers', answers);
    console.log('question general', questionGeneral);

    function deleteQuestion() {
        setQuestions((prevQuestions) => {
            let newQuestions = [...prevQuestions];
            newQuestions.splice(questionIndex, 1);
            return (
                newQuestions
            );
        });
    }

    // console.log(configObject);


    React.useEffect(() => {
        if (renderCount.current > 1) {
            setQuestions(prevQuestions => {
                let newQuestions = [...prevQuestions];
                newQuestions[questionIndex] = {
                    ...questionGeneral,
                    answers: [...answers],
                };
                return newQuestions;
            });
        }
    }, [saveSignal]);

    /*React.useEffect(() => {
        if (renderCount.current > 2) {
            let newQuestion = {...configObject.questions[questionIndex]};
            let newAnswers = [...newQuestion.answers];
            setAnswers(newAnswers);
            let newQuestionGeneral = {
                question: newQuestion.question,
                answersType: newQuestion.answersType,
            };
            setQuestionGeneral(newQuestionGeneral);
        }
    }, [configObject]);
*/

    function addNewAnswer() {
        setAnswers((prevAnswers) => {
            let newAnswers = [...prevAnswers];
            if (questionGeneral.answersType === 'number') {
                newAnswers.push({min: '', max: '', mark: ''});
            } else {
                newAnswers.push({answer: '', mark: ''});
            }
            return newAnswers;
        });
    }

    function handleChange(event) {
        setQuestionGeneral(prevQuestionData => {
            return {
                ...prevQuestionData,
                [event.target.name]: event.target.value,
            };
        });
    }

    React.useEffect(() => {
        if (renderCount.current > 1) {
            let emptyAnswer;
            if (questionGeneral.answersType === 'number') {
                emptyAnswer = {
                    min: '',
                    max: '',
                    mark: '',
                };
            } else {
                emptyAnswer = {
                    answer: '',
                    mark: '',
                };
            }
            setAnswers((prevAnswers) => {
                let newAnswers = [];
                for (let i = 0; i < prevAnswers.length; i++) {
                    newAnswers.push(emptyAnswer);
                }
                return [...newAnswers];
            });
        }
    }, [questionGeneral.answersType]);


    return (
        <>
            <h2>{questionIndex + 1}.)</h2>
            <TextField
                label='Question'
                placeholder='Text'
                onChange={(event) => handleChange(event)}
                name="question"
                type="text"
                value={questionGeneral.question} style={{display: 'block'}}/>
            <p>Answers type:</p>
            <RadioGroup row>
                <FormControlLabel control={
                    <Radio
                        type="radio"
                        name="answersType"
                        value="radio"
                        onChange={(event) => handleChange(event)}
                        checked={questionGeneral.answersType === 'radio'}
                    />
                } label='Radio' />
                <FormControlLabel control={
                    <Radio
                        type="radio"
                        name="answersType"
                        value="checkbox"
                        onChange={(event) => handleChange(event)}
                        checked={questionGeneral.answersType === 'checkbox'}
                    />
                } label='Checkbox' />
                <FormControlLabel control={
                    <Radio
                        type="radio"
                        name="answersType"
                        value="text"
                        onChange={(event) => handleChange(event)}
                        checked={questionGeneral.answersType === 'text'}
                    />
                } label='Text' />
                <FormControlLabel control={
                    <Radio
                        type="radio"
                        name="answersType"
                        value="number"
                        onChange={(event) => handleChange(event)}
                        checked={questionGeneral.answersType === 'number'}
                    />
                } label='Number' />

            </RadioGroup>


            <br/>
            {questionGeneral.answersType && <button onClick={addNewAnswer}>Add new answer</button>}
            <button onClick={deleteQuestion}>Delete question</button>
            <CreateAnswers answers={answers} answersType={questionGeneral.answersType} setAnswers={setAnswers}/>
        </>

    );
}