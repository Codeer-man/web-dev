import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo } from '../features/todos/TodoSlice'

  const TodoList = () => {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.items)
  const filter = useSelector(state => state.todos.filter)

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <ul className="space-y-2">
      {filteredTodos.map(todo => (
        <li 
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo.id))}
          className={`cursor-pointer p-2 rounded ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

export default TodoList;
