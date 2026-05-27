import { TaskItem } from './TaskItem'

export function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-sm text-gray-400 py-8">
        No tasks yet — add one above!
      </p>
    )
  }

  return (
    <ul className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
