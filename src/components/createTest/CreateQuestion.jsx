import React from 'react';
import CreateAnswers from './CreateAnswers.jsx';


export default function CreateQuestion({
                                           questionIndex,
                                           questionData,
                                           addQuestionAnswer,
                                           updateQuestionAnswerProperty,
                                           updateQuestionProperty,
                                       }) {

    // function deleteQuestion() {
    //     setQuestions((prevQuestions) => {
    //         let newQuestions = [...prevQuestions];
    //         newQuestions.splice(questionIndex, 1);
    //         return (
    //             newQuestions
    //         );
    //     });
    // }

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
        let keyToChange;
        if (event.target.name.includes('answersType')) {
            keyToChange = 'answersType';
        } else {
            keyToChange = event.target.name;
        }
        setQuestionGeneral(prevQuestionData => {
            return {
                ...prevQuestionData,
                [keyToChange]: event.target.value,
            };
        });
    }

    React.useEffect(() => {
        let emptyAnswer;
        if (questionGeneral.answersType === 'number') {
            emptyAnswer = {
                min: '',
                max: '',
                mark: ''
            }
        } else {
            emptyAnswer = {
                answer: '',
                mark: ''
            }
        }
        setAnswers((prevAnswers) => {
            let newAnswers = [];
            for (let i = 0; i < prevAnswers.length; i++) {
                newAnswers.push(emptyAnswer)
            }
            return [...newAnswers];
        })
    }, [questionGeneral.answersType])


    return (
        <>
            <h2>{questionIndex + 1}.)</h2>
            <p>Question:</p>
            <input onChange={(event) => handleChange(event)} name="question" type="text"
                   value={questionGeneral.question} style={{display: "block"}}/>
            <p>Answers type:</p>
            <input
                type="radio"
                name={`answersType${questionIndex}`}
                id={`setTypeRadio${questionIndex}`}
                value='radio'
                onChange={(event) => handleChange(event)}
                checked={questionGeneral.answersType === 'radio'}
            />
            <label htmlFor={`setTypeRadio${questionIndex}`}>Radio</label>


            <input
                type="radio"
                name={`answersType${questionIndex}`}
                id={`setTypeCheckbox${questionIndex}`}
                value='checkbox'
                onChange={(event) => handleChange(event)}
                checked={questionGeneral.answersType === 'checkbox'}
            />
            <label htmlFor={`setTypeCheckbox${questionIndex}`}>Checkbox</label>


            <input
                type="radio"
                name={`answersType${questionIndex}`}
                id={`setTypeText${questionIndex}`}
                value='text'
                onChange={(event) => handleChange(event)}
                checked={questionGeneral.answersType === 'text'}
            />
            <label htmlFor={`setTypeText${questionIndex}`}>Text</label>


            <input
                type="radio"
                name={`answersType${questionIndex}`}
                id={`setTypeNumber${questionIndex}`}
                value="number"
                onChange={(event) => handleChange(event)}
                checked={questionGeneral.answersType === 'number'}
            />
            <label htmlFor={`setTypeNumber${questionIndex}`}>Number</label>

            <br/>
            {questionGeneral.answersType === 'checkbox' &&
                <input type="number" name="maxChecked" placeholder="Max checked" value={questionGeneral.maxChecked}
                       onChange={(event) => handleChange(event)}/>}
            {questionGeneral.answersType && <button onClick={addNewAnswer}>Add new answer</button>}
            {/*<button onClick={deleteQuestion}>Delete question</button>*/}
            <CreateAnswers answers={answers} answersType={questionGeneral.answersType} setAnswers={setAnswers}/>
        </>

    );
}