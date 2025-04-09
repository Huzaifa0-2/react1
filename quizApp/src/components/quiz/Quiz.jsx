import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { right, wrong, resetQuiz } from '../../Store/quizSlice';
import MyTimer from '../timer/Timer';


const Quiz = () => {

    const time = new Date();
    const newTimer = time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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


    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

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
        const baseClass = "w-full text-left transition-all duration-300 transform hover:scale-[1.02] font-medium rounded-xl text-sm px-6 py-4 mb-3 border ";
        const activeClass = "ring-1 ring-opacity-50 ring-offset-1 ";
    
        if (optionDisabled) {
            if (option === quizArray[currentQuestions].correct_answer) {
                return baseClass + activeClass + "bg-green-900/30 text-green-400 ring-green-400 shadow-lg shadow-green-500/20 border-green-400/30";
            }
            if (option === selectedOption && option !== quizArray[currentQuestions].correct_answer) {
                return baseClass + activeClass + "bg-red-900/30 text-red-400 ring-red-400 shadow-lg shadow-red-500/20 border-red-400/30";
            }
            return baseClass + "bg-gray-800/50 text-gray-500 border-gray-700";
        }
    
        return baseClass + "bg-black text-gray-300 hover:bg-gray-700/80 shadow-md hover:shadow-gray-500/10 border-gray-700";
    };
    

    const progressPercentage = ((currentQuestions) / quizArray.length) * 100;
    const wrongAnswerBar = (wrongAnswer / currentQuestions) * 100;
    const rightAnswerBar = (rightAnswer / currentQuestions) * 100;

    if (quizEnded) {
        return (
            <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Neon cursor glow effect */}
                <div 
                    className="fixed pointer-events-none w-40 h-40 rounded-full bg-green-700 blur-3xl transition-all duration-300 ease-out"
                    style={{
                        transform: `translate(${cursorPosition.x - 192}px, ${cursorPosition.y - 192}px)`,
                    }}
                />
                
                <div className="max-w-2xl mx-auto border border-green-400/20 bg-black backdrop-blur-lg rounded-3xl shadow-2xl shadow-green-500/10 overflow-hidden relative z-10">
                    <div className='p-8 text-center space-y-6'>
                        <h1 className='text-4xl font-bold text-green-400 neon-text'>Quiz Completed!</h1>
                        <div className="text-xl my-6 space-y-3 text-gray-300">
                            <p>Correct Answers: <span className="text-green-400 font-bold">{rightAnswer}</span></p>
                            <p>Wrong Answers: <span className="text-red-400 font-bold">{wrongAnswer}</span></p>
                            <p>Final Score: <span className="text-blue-400 font-bold">{score}</span></p>
                            <p className={`text-2xl mt-4 font-medium ${score > 2 ? 'text-green-400' : 'text-red-400'}`}>{showResult}</p>
                        </div>
                        <button
                            className='relative overflow-hidden bg-black text-green-400 px-8 py-4 rounded-full cursor-pointer border-2 border-green-400/50 hover:border-green-400 text-lg font-medium transition-all duration-500 hover:shadow-lg hover:shadow-green-500/20 group'
                            onClick={restartQuiz}
                        >
                            <span className="relative z-10">Restart Quiz</span>
                            <span className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20 transition-all duration-500 rounded-full scale-0 group-hover:scale-100"></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
                <div 
                    className="fixed pointer-events-none w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-700 opacity-20 blur-xl transition-all duration-200 ease-out"
                    style={{
                        transform: `translate(${cursorPosition.x - 80}px, ${cursorPosition.y - 80}px)`,
                    }}
                />
                
                {/* Main container with Nuxt-inspired styling */}
                <div className="max-w-2xl mx-auto border border-green-400/10 bg-gradient-to-br from-black to-gray-900/80 backdrop-blur- md rounded-3xl shadow-2xl shadow-green-500/5 overflow-hidden relative z-10 transition-all duration-300 hover:shadow-green-500/20 hover:border-green-400/30 group">
                    {/* Inner glow effect on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-500/10 to-transparent rounded-3xl blur-md" />
                    </div>
                    
                    <div className='p-8 text-center space-y-6 relative z-20'>
                        {/* Title with pulsing animation */}
                        <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-2 animate-pulse-slow'>
                            Test Your Knowledge
                        </h1>
                        
                        {/* Subtitle with subtle glow */}
                        <p className="text-gray-400/80 text-lg mb-8 transition-all duration-300 group-hover:text-gray-300">
                            Ready to challenge yourself with {quizArray.length} questions?
                        </p>
                        
                        {/* Enhanced start button */}
                        <div className="relative inline-block group/button">
                            {/* Button glow effect */}
                            <div className="absolute -inset-1 rounded-full bg-green-600/30 blur-md opacity-0 group-hover/button:opacity-100 transition-opacity duration-500" />
                            
                            {/* Button main */}
                            <button 
                                className="relative bg-black text-green-400 px-10 py-4 rounded-full cursor-pointer border border-green-400/30 hover:border-green-400 text-lg font-medium transition-all duration-500 hover:text-green-300 group-hover/button:shadow-lg group-hover/button:shadow-green-500/30"
                                onClick={() => setQuizStarted(true)}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span className="group-hover/button:animate-pulse">▶</span>
                                    <span>Start Quiz</span>
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/5 to-green-500/0 transition-all duration-500 rounded-full opacity-0 group-hover/button:opacity-100" />
                            </button>
                        </div>
                        
                        {/* Footer with subtle grid pattern */}
                        <div className="pt-8 mt-8 border-t border-gray-800/50 relative">
                            <div className="absolute inset-0 overflow-hidden rounded-b-3xl">
                                <div className="absolute inset-0 bg-grid-small-green-500/10" />
                            </div>
                            <p className="text-xs text-gray-600 relative">
                                Powered by React & Redux
                            </p>
                        </div>
                    </div>
                </div>
    
                {/* Add this to your global CSS or CSS-in-JS */}
                <style jsx global>{`
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.9; }
                        50% { opacity: 0.7; }
                    }
                    .animate-pulse-slow {
                        animation: pulse-slow 3s ease-in-out infinite;
                    }
                    .bg-grid-small-green-500/10 {
                        background-image: 
                            linear-gradient(to right, rgba(74, 222, 128, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(74, 222, 128, 0.05) 1px, transparent 1px);
                        background-size: 20px 20px;
                    }
                    .neon-text {
                        text-shadow: 0 0 8px rgba(74, 222, 128, 0.4), 
                                    0 0 12px rgba(74, 222, 128, 0.2),
                                    0 0 16px rgba(74, 222, 128, 0.1);
                    }
                `}</style>
            </div>
        );
    }

    if (quizStarted) {
        return (
            <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Neon cursor glow effect */}
                <div 
                    className="fixed pointer-events-none w-40 h-40 rounded-full bg-green-700 blur-3xl transition-all duration-300 ease-out"
                    style={{
                        transform: `translate(${cursorPosition.x - 192}px, ${cursorPosition.y - 192}px)`,
                    }}
                />
                
                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Glass Card Container */}
                    <div className="max-w-2xl mx-auto border border-green-400/10 bg-gradient-to-br from-black to-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-green-500/5 overflow-hidden relative z-10 transition-all duration-300 hover:shadow-green-500/20 hover:border-green-400/30 group">
                        {/* Progress Bar */}
                        <div className="h-1.5 bg-gray-700/50">
                            <div
                                className="h-full bg-green-500/80 transition-all duration-500 ease-out shadow-lg shadow-green-500/20"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>

                        {/* Header Timer */}
                        <div className='px-6 pt-4 text-sm font-semibold text-green-400'>
                            <div className='font-bold'><MyTimer setQuizEnded={setQuizEnded} expiryTimestamp={time} /></div>
                        </div>

                        {/* Quiz Content */}
                        <div className="p-8">
                            {/* Header with Stats */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="text-sm font-semibold text-gray-400">
                                    Question {currentQuestions + 1} of {quizArray.length}
                                </div>
                                <div className="flex space-x-4">
                                    <div className="text-center px-3 py-1 bg-black shadow-lg shadow-green-500/20 rounded-full border border-green-400/20">
                                        <div className="text-xs text-green-400">Correct</div>
                                        <div className="font-bold text-green-400">{rightAnswer}</div>
                                    </div>
                                    <div className="text-center px-3 py-1 bg-black shadow-lg shadow-red-500/20 rounded-full border border-red-400/20">
                                        <div className="text-xs text-red-400">Wrong</div>
                                        <div className="font-bold text-red-400">{wrongAnswer}</div>
                                    </div>
                                    <div className="text-center px-3 py-1 bg-black shadow-lg shadow-blue-500/20 rounded-full border border-blue-400/20">
                                        <div className="text-xs text-blue-400">Score</div>
                                        <div className="font-bold text-blue-400">{score}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Question */}
                            <h1 className="text-2xl font-bold text-gray-300 mb-8 leading-tight">
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
                                            <span className="mr-3 font-mono text-gray-500">{String.fromCharCode(65 + index)}.</span>
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
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        optionDisabled && currentQuestions < quizArray.length
                                            ? "bg-green-600/90 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/30 border border-green-400/50"
                                            : "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600"
                                    }`}
                                >
                                    {currentQuestions < quizArray.length - 1 ? 'Next Question →' : 'Show Result'}
                                </button>
                            </div>
                        </div>
                        <div className="h-1.5 bg-gray-700/50">
                            <div className='flex h-full'>
                                <div
                                    className="h-full bg-green-500/80 transition-all duration-500 ease-out shadow-lg shadow-green-500/20"
                                    style={{ width: `${rightAnswerBar}%` }}
                                ></div>
                                <div
                                    className="h-full bg-red-500/80 transition-all duration-500 ease-out shadow-lg shadow-red-500/20"
                                    style={{ width: `${wrongAnswerBar}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add this to your global CSS or CSS-in-JS */}
                <style jsx global>{`
                    .neon-text {
                        text-shadow: 0 0 5px rgba(74, 222, 128, 0.3), 
                                     0 0 10px rgba(74, 222, 128, 0.2),
                                     0 0 15px rgba(74, 222, 128, 0.1);
                    }
                `}</style>
            </div>
        );
    };

}

export default Quiz;