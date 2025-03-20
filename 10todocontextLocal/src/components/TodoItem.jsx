import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
    
  const {updateTodo, deleteTodo, toggleComplete} = useTodo();

const editTodo = () => {
  updateTodo(todo.id, { ...todo, todo: todoMsg });
  setIsTodoEditable(false);
}
const toggleCompleted = () => {
  toggleComplete(todo.id);
} 
return (
  <div
    className={`flex items-center border border-transparent rounded-xl px-4 py-3 gap-x-4 shadow-lg transition-all duration-300 ${
      todo.completed ? "bg-gradient-to-r from-[#a8e063] to-[#56ab2f]" : "bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
    }`}
  >
    <input
      type="checkbox"
      className="cursor-pointer w-5 h-5 accent-[#ffffff]"
      checked={todo.completed}
      onChange={toggleCompleted}
    />
    <input
      type="text"
      className={`flex-1 border-none outline-none bg-transparent rounded-lg text-lg font-medium ${
        isTodoEditable ? "border border-white/20 px-3" : "border-transparent"
      } ${todo.completed ? "line-through text-white/70" : "text-white"}`}
      value={todoMsg}
      onChange={(e) => setTodoMsg(e.target.value)}
      readOnly={!isTodoEditable}
    />
    <button
      className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
      onClick={() => {
        if (todo.completed) return;
        if (isTodoEditable) {
          editTodo();
        } else setIsTodoEditable((prev) => !prev);
      }}
      disabled={todo.completed}
    >
      {isTodoEditable ? "💾" : "✏️"}
    </button>
    <button
      className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
      onClick={() => deleteTodo(todo.id)}
    >
      🗑️
    </button>
  </div>
);
}

export default TodoItem;
