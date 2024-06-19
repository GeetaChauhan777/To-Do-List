import React, { useState, useEffect } from 'react'

const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (savedTasks) {
      setTasks(savedTasks)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() === '') return
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
    setNewTask('')
  }

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.text.localeCompare(b.text)
    }
    if (sortBy === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1
    }
    return 0
  })

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder='Add a new task'
      />
      <button onClick={addTask}>Add</button>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <div>
        <button onClick={() => setSortBy('default')}>Default</button>
        <button onClick={() => setSortBy('alphabetical')}>Alphabetical</button>
        <button onClick={() => setSortBy('completed')}>Completed</button>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
