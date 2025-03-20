import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState('')
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()

        if(!todo) return

        addTodo({ todo, completed: false})
        setTodo('')
    }
    return (
        <form onSubmit={add} className="flex gap-x-2">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="w-full border border-white/20 rounded-l-xl px-4 py-3 outline-none bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-[#00b4db] transition-all duration-300"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-r-xl px-6 py-3 bg-gradient-to-r from-[#00b4db] to-[#0083b0] text-white font-semibold hover:opacity-90 transition-opacity duration-300"
          >
            Add
          </button>
        </form>
      );
}

export default TodoForm;