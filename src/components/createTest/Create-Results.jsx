import React from 'react';


export default function CreateResults({setGeneral, saveSignal}) {
    const [resultRanges, setResultRanges] = React.useState([]);
    React.useEffect(() => {
        setGeneral(prevGeneral => {
            return {
                ...prevGeneral,
                results: resultRanges
            }
        })
    }, [saveSignal])

    function addResultRange() {
        setResultRanges(prevResults => {
            let newResults = [...prevResults]
            newResults.push({min: '', max: '', resultName: '', resultDescription: ''})
            return newResults;
        })
    }
    function deleteResultRange(event) {
        setResultRanges((prevResultRanges) => {
            let newResultRanges = [...prevResultRanges];
            newResultRanges.splice(event.target.name, 1);
            return newResultRanges;
        });
    }
    function handleChange(event, index) {
        setResultRanges(prevResultRanges => {
            let newResultRange = prevResultRanges[index];
            newResultRange = {
                ...newResultRange,
                [event.target.name]: event.target.value
            }
            let newResultRanges = [...prevResultRanges]
            newResultRanges[index] = newResultRange;
            return [...newResultRanges]
        })
    }


    let resultRangeElement = resultRanges.map((resultRange, index) => {
        console.log(resultRange);
        return (
            <React.Fragment key={index}>
                <br />
                <br />
                <span>Min:</span>
                <input
                    type='number'
                    name='min'
                    value={resultRange.min}
                    onChange={event => handleChange(event, index)}
                />

                <span>Max:</span>
                <input
                    type='number'
                    name='max'
                    value={resultRange.max}
                    onChange={event => handleChange(event, index)}
                />

                <br />
                <span>Result name:</span>
                <input
                    type='text'
                    name='resultName'
                    value={resultRange.resultName}
                    onChange={event => handleChange(event, index)}
                />

                <br />
                <span>Result description:</span>
                <textarea
                    name='resultDescription'
                    value={resultRange.resultDescription}
                    onChange={event => handleChange(event, index)}
                />

                <button name={index} onClick={(event) => deleteResultRange(event)}>Delete result range</button>
            </React.Fragment>
        )
    })
    return (
        <>
            <br />
            <button onClick={addResultRange}>Add result range</button>
            {resultRangeElement}
        </>
    )
}