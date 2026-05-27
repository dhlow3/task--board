import { useTasks } from './hooks/useTasks'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

export default function App() {
  const { tasks, loading, addTask, toggleComplete, deleteTask } = useTasks()

  // Summary counts
  const total = tasks.length
  const done = tasks.filter((t) => t.is_complete).length

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          {!loading && total > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              {done} of {total} completed
            </p>
          )}
        </div>

        {/* Add task */}
        <TaskForm onAdd={addTask} />

        {/* Task list */}
        {loading ? (
          <p className="text-center text-sm text-gray-400 py-8 animate-pulse">
            Loading…
          </p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleComplete}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  )
}
