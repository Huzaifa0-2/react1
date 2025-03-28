import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { right } from '../../Store/quizSlice'
import { wrong } from '../../Store/quizSlice'

const Quiz = () => {
    const [currentQuestions, setCurrentQuestions] = useState(0)
    const [options, setOptions] = useState("")
    const [optionDisabled, setOptionDisabled] = useState(false)

    const dispatch = useDispatch()

    const quizArray = useSelector((state) => state.questionsArr)
    // console.log(quizArray)
    // const incorrectOption = useSelector((state) => state.initialState.questionsArr)
    // const CorrectOption = useSelector((state) => state.initialState.questionsArr.correct_answer)

    const handleOptions = () => {
        setCurrentQuestions(currentQuestions + 1)
        setOptions(options[currentQuestions])
    }
    const checkAnswer = (item) => {
        setOptionDisabled(true)
        if (item === quizArray[currentQuestions].correct_answer) {
            dispatch(right())
            console.log("right")
        }
        else {
            dispatch(wrong())
            console.log("wrong")
        }
    }

    return (
        <>
            <div>
                <div>
                    <h1>{quizArray[currentQuestions].question}</h1>
                    <button 
                    disabled = {optionDisabled}    
                    onClick={() => checkAnswer(quizArray[currentQuestions].correct_answer)}>
                        {quizArray[currentQuestions].correct_answer}
                    </button>

                    {quizArray[currentQuestions].incorrect_answers.map((item, index) =>
                    (<button
                        disabled = {optionDisabled}
                        key={index}
                        onClick={() => checkAnswer(item)}
                    >{item}</button>)
                    )}


                    {/* <button></button>
            <button></button> */}
                </div>
                <div>
                    <button onClick={handleOptions}>
                        Next Question
                    </button>
                </div>
            </div>
        </>
    )
}

export default Quiz