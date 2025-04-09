import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { right, wrong, resetQuiz } from '../../Store/quizSlice';
import MyTimer from '../timer/Timer';


const Quiz = () => {

    const time = new Date();
    const newTimer = time.setSeconds(time.getSeconds() + 60); // 5 minutes timer

    const [currentQuestions, setCurrentQuestions] = useState(0);
    const [optionDisabled, setOptionDisabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [showResult, setShowResult] = useState("");

    const dispatch = useDispatch();
    const quizArray = useSelector((state) => state.questionsArr);
    const { score, rightAnswer, wrongAnswer } = useSelector((state) => ({
        score: state.score,
        rightAnswer: state.rightAnswer,
        wrongAnswer: state.wrongAnswer
    }));

    // const handleNextQuestion = () => {
    //     if (    !currentQuestions < quizArray.length - 1) {
    //         setQuizEnded(true)
    //     }
    //         setCurrentQuestions(prev => prev + 1);
    //         setOptionDisabled(false);
    //         setSelectedOption(null);
    //     // } else {
    //     //     // Quiz ended
    //     //     setQuizEnded(true);
    //     // }
    // };

    const handleNextQuestion = () => {
        if (currentQuestions < quizArray.length - 1) {
            setCurrentQuestions(prev => prev + 1);
            setOptionDisabled(false);
            setSelectedOption(null);
        } else {
            setQuizEnded(true);
            if (score > 2) {
                setShowResult("Congrats! You passed the quiz.");
            } else {
                setShowResult("Sorry! You failed the quiz.");
            }
        }
    };

    const restartQuiz = () => {
        setCurrentQuestions(0);
        setOptionDisabled(false);
        setSelectedOption(null);
        setQuizStarted(true);
        setQuizEnded(false);

        dispatch(resetQuiz());
    };

    const checkAnswer = (item) => {
        setSelectedOption(item);
        setOptionDisabled(true);
        item === quizArray[currentQuestions].correct_answer ? dispatch(right()) : dispatch(wrong());
    };

    const getButtonClass = (option) => {
        const baseClass = "w-full text-left transition-all duration-300 transform hover:scale-[1.02] font-medium rounded-xl text-sm px-6 py-4 mb-3 ";
        const activeClass = "ring-2 ring-opacity-50 ring-offset-1 ";

        if (optionDisabled) {
            if (option === quizArray[currentQuestions].correct_answer) {
                return baseClass + activeClass + "bg-emerald-500/90 text-white ring-emerald-300 shadow-lg shadow-emerald-500/20";
            }
            if (option === selectedOption && option !== quizArray[currentQuestions].correct_answer) {
                return baseClass + activeClass + "bg-rose-500/90 text-white ring-rose-300 shadow-lg shadow-rose-500/20";
            }
            return baseClass + "bg-gray-100/50 text-gray-500";
        }

        return baseClass + "bg-white/80 text-gray-800 hover:bg-white shadow-md hover:shadow-lg";
    };

    const progressPercentage = ((currentQuestions) / quizArray.length) * 100;
    const wrongAnswerBar = (wrongAnswer / currentQuestions) * 100;
    const rightAnswerBar = (rightAnswer / currentQuestions) * 100;

    if (quizEnded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto border border-white/30 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
                    <div className='p-8 text-center space-y-4'>
                        <h1 className='text-3xl font-bold'>Quiz Completed!</h1>
                        <div className="text-xl my-4">
                            <p>Correct Answers: <span className="text-green-600 font-bold">{rightAnswer}</span></p>
                            <p>Wrong Answers: <span className="text-red-600 font-bold">{wrongAnswer}</span></p>
                            <p>Final Score: <span className="text-blue-600 font-bold">{score}</span></p>
                            <p className="text-purple-600 font-bold">{showResult}</p>
                        </div>
                        <button
                            className='bg-blue-500 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-blue-600 text-lg font-medium transition-all duration-300 transform hover:scale-105'
                            onClick={restartQuiz}
                        >
                            Restart Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto border border-white/30 bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
                    <div className='p-8 text-center space-y-4'>
                        <h1 className='text-3xl font-bold'>Test Your Knowledge</h1>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600' onClick={() => setQuizStarted(true)}>Start Quiz</button>
                    </div>
                </div>
            </div>
        )
    }


    if (quizStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Glass Card Container */}
                    <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/30">
                        {/* Progress Bar */}
                        <div className="h-2 bg-gray-200/50">
                            <div
                                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>

                        {/* Header Timer */}
                        <div className='text-sm font-semibold text-gray-600'>
                            <div className=' font-bold'><MyTimer setQuizEnded={setQuizEnded} expiryTimestamp={time} /></div>
                        </div>

                        {/* Quiz Content */}
                        <div className="p-8">
                            {/* Header with Stats */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-sm font-semibold text-gray-600">
                                    {/* <MyTimer expiryTimestamp={time} /> */}
                                    Question {currentQuestions + 1} of {quizArray.length}
                                </div>
                                <div className="flex space-x-4">
                                    <div className="text-center px-3 py-1 bg-green-100/80 rounded-full">
                                        <div className="text-xs text-green-800">Correct</div>
                                        <div className="font-bold text-green-600">{rightAnswer}</div>
                                    </div>
                                    <div className="text-center px-3 py-1 bg-red-100/80 rounded-full">
                                        <div className="text-xs text-red-800">Wrong</div>
                                        <div className="font-bold text-red-600">{wrongAnswer}</div>
                                    </div>
                                    <div className="text-center px-3 py-1 bg-blue-100/80 rounded-full">
                                        <div className="text-xs text-blue-800">Score</div>
                                        <div className="font-bold text-blue-600">{score}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Question */}
                            <h1 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
                                {quizArray[currentQuestions]?.question}
                            </h1>

                            {/* Options */}
                            <div className="space-y-3 mb-8">
                                {quizArray[currentQuestions]?.incorrect_answers.map((item, index) => (
                                    <button
                                        key={index}
                                        className={getButtonClass(item)}
                                        disabled={optionDisabled}
                                        onClick={() => checkAnswer(item)}
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-3 font-mono text-gray-500/80">{String.fromCharCode(65 + index)}.</span>
                                            <span>{item}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleNextQuestion}
                                    disabled={!optionDisabled}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${optionDisabled && currentQuestions < quizArray.length
                                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                >
                                    {currentQuestions < quizArray.length - 1 ? 'Next Question →' : 'Show Result'}
                                </button>
                            </div>
                        </div>
                        <div className="h-2 bg-gray-200/50">
                            <div className='flex h-full'>

                                <div
                                    className="h-full bg-green-500 transition-all duration-500 ease-out"
                                    style={{ width: `${rightAnswerBar}%` }}
                                ></div>
                                <div
                                    className="h-full bg-red-500 transition-all duration-500 ease-out"
                                    style={{ width: `${wrongAnswerBar}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}

export default Quiz;