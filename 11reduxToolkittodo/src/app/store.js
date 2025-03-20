import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
    reducer: todoReducer
})


// why using todoReducer as anything like this is not present in the todoSlice.js
// while the exported thing is todoSlice.reducer not todoReducer