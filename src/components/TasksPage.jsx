import { useState } from 'react'
import { Icon } from '../data/seed'
import { useLocalStorage } from '../hooks/useLocalStorage'

// ──────────────────────────────────────────────
// TasksPage — Personal task manager with add, toggle, and priority
// Tasks persist in localStorage so they survive page refreshes
// ──────────────────────────────────────────────
export function TasksPage() {
  // Default tasks shown on first load
  const defaultTasks = [
    { id: 1, title: 'Complete self-assessment form', done: true, due: 'Apr 5', priority: 'high' },
    { id: 2, title: 'Submit Q1 project report', done: false, due: 'Apr 8', priority: 'high' },
    { id: 3, title: 'Update emergency contact info', done: false, due: 'Apr 15', priority: 'medium' },
    { id: 4, title: 'Enroll in AWS certification course', done: false, due: 'Apr 20', priority: 'low' },
  ]

  const [tasks, setTasks] = useLocalStorage('fluidhr_tasks', defaultTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Toggle a task between done and not done
  const toggleTask = (id) =>
    setTasks((all) => all.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))

  // Add a new task to the list
  const addTask = () => {
    if (!newTaskTitle.trim()) return
    setTasks((all) => [...all, {
      id: Date.now(),
      title: newTaskTitle,
      done: false,
      due: '',
      priority: 'medium',
    }])
    setNewTaskTitle('')
  }

  // Priority badge colors
  const priorityColors = {
    high: 'text-red-500 bg-red-50',
    medium: 'text-amber-600 bg-amber-50',
    low: 'text-green-600 bg-green-50',
  }

  return (
    <div className="page-enter space-y-4">
      <h2 className="text-xl font-extrabold text-[#1a2e25]">Tasks</h2>

      {/* New task input */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none bg-white"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}
          className="bg-[#1B5E4F] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#2d8a72] transition-colors">
          Add
        </button>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {tasks.map((task) => (
          <div key={task.id}
            className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
            {/* Checkbox circle */}
            <button onClick={() => toggleTask(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                task.done ? 'bg-[#1B5E4F] border-[#1B5E4F]' : 'border-gray-300'
              }`}>
              {task.done && <span className="text-white">{Icon.check}</span>}
            </button>

            {/* Task title and due date */}
            <div className="flex-1">
              <p className={`text-sm font-bold ${task.done ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                {task.title}
              </p>
              {task.due && <p className="text-xs text-gray-400 mt-0.5">Due {task.due}</p>}
            </div>

            {/* Priority badge */}
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold capitalize ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
