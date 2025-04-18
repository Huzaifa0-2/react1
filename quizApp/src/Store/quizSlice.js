import { createSlice, nanoid } from "@reduxjs/toolkit";

const questionsArr = [
    {
        question:
            "What was the name of the hero in the 80s animated video game  27Dragon 27s Lair 27 3F",
        correct_answer: "Dirk the Daring",
        incorrect_answers: ["Arthur", "Dirk the Daring", "Sir Toby Belch", "Guy of Gisbourne"],
    },
    {
        question: "What is the scientific name for modern day humans 3F",
        correct_answer: "Homo Sapiens",
        incorrect_answers: [
            "Homo Ergaster",
            "Homo Erectus",
            "Homo Neanderthalensis",
            "Homo Sapiens"
        ],
    },
    {
        question: "What is Ron Weasley 27s middle name 3F",
        correct_answer: "Bilius",
        incorrect_answers: ["Bilius", "Arthur", "John", "Dominic"],
    },
    {
        question:
            "Who is the creator of the comic series  22The Walking Dead 22 3F",
        correct_answer: "Robert Kirkman",
        incorrect_answers: [
            "Stan Lee",
            "Malcolm Wheeler-Nicholson",
            "Robert Kirkman",
            "Robert Crumb",
        ],
    },
    {
        question:
            "At the start of a standard game of the Monopoly 2C if you throw a double six 2C which square would you land on 3F",
        correct_answer: "Electric Company",
        incorrect_answers: ["Water Works", "Electric Company", "Chance", "Community Chest"],
    },
]

const initialState = {
    questionsArr,
    score: 0,
    rightAnswer: 0,
    wrongAnswer: 0
}

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        right: (state, action) => {
            state.score = state.score + 1
            state.rightAnswer = state.rightAnswer + 1
        },
        wrong: (state, action) => {
            state.score = state.score - 1
            state.wrongAnswer = state.wrongAnswer + 1
        },
        resetQuiz: (state, action) => {
            state.score = 0;
            state.rightAnswer = 0;
            state.wrongAnswer = 0;
        },  
    }
})

export const { right, wrong, resetQuiz } = quizSlice.actions

export default quizSlice.reducer