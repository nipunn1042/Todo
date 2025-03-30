import React,{ useContext, useState, useEffect, useRef } from 'react';
import { ThemeContext } from './ThemeContext'


const TodoList = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const [task, setTask] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    })
    const [taskContent, setTaskContent] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
        setTask(storedTasks)
    },[])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(task))
    },[task])

    const handleAddTask = () => {
        if (taskContent.trim() === '') return
        const newTask = {
            id: Date.now(),
            content: taskContent,
            completed: false
        }
        setTask(prev=> [...prev, newTask])
        setTaskContent('')
        inputRef.current.focus()
    }

    const handleDeleteTask = (id) => {
        const newTasks = task.filter(task => task.id !== id)
        setTask(newTasks)
    }

    const handleToggleTask = (id) => {
        const newTasks = task.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed}
            }
            return task
        })
        setTask(newTasks)
    }

  return (
    <div>
        <div>
            <button 
            onClick={toggleTheme}
            className='px-4 py-2 mb-4 bg-blue-500 text-white rounded'>Change Theme</button>
        </div>
        <h1 className=''>Todo List</h1>

        <div className='flex flex-col items-center'>
            <input 
            type='text' 
            value={taskContent} 
            onChange={(e) => setTaskContent(e.target.value)} 
            ref={inputRef}
            className='border border-gray-300 rounded p-2 mb-4'
            placeholder='Add a new task'
            />
            <button 
            onClick={handleAddTask}
            className='px-4 py-2 bg-green-500 text-white rounded'>Add Task</button>
        </div>

        <h1 className='text-lg font-semibold mt-4'>Completed Tasks</h1>

        {task.filter(task => task.completed).length === 0 ? (
            <p className='text-gray-500'>No completed tasks</p>
        ) : (
            <ul className='list-disc pl-6'>
                {task.filter(task => task.completed).map(task => (
                    <li key={task.id} className='flex items-center justify-between'>
                        <span className='line-through'>{task.content}</span>
                        <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className='ml-4 text-red-500'>Delete</button>
                    </li>
                ))}
            </ul>
        )}

        <h1>Pending Tasks</h1>

        {task.filter(task => !task.completed).length === 0 ? (
            <p className='text-gray-500'>No pending tasks</p>
        ) : (
            <ul className='list-disc pl-6'>
                {task.filter(task => !task.completed).map(task => (
                    <li key={task.id} className='flex items-center justify-between'>
                        <span>{task.content}</span>
                        <button 
                        onClick={() => handleToggleTask(task.id)}
                        className='ml-4 text-blue-500'>Complete</button>
                        <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className='ml-4 text-red-500'>Delete</button>
                    </li>
                ))}
            </ul>
        )}

    </div>
  )
}

export default TodoList
