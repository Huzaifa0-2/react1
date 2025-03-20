import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "Hello world" }]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, actions) => {
            const todo = {
                id: nanoid(),
                text: actions.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, actions) => {
            state.todos = state.todos.filter((todo) => todo.id !== actions.payload)
        },
        updateTodo: (state, actions) => {
            state.todos = state.todos.map((todo) => todo.id === actions.payload.id ? actions.payload : todo)
        },
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer

// why using or exporting todoSlice.reducer rather than initialState as it stores todos and sending it to the store and getting it from there to list the todos in the UI.
// what todoSlice.reducer do and how to access initialState array