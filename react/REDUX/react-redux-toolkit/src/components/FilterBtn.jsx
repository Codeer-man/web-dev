import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../features/todos/TodoSlice'

 const FilterButtons = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.todos.filter)

  const filters = ['all', 'active', 'completed']

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => dispatch(setFilter(filter))}
          className={`px-3 py-1 rounded ${
            currentFilter === filter 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons;