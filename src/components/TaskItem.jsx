export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.is_complete}
        onChange={() => onToggle(task.id, task.is_complete)}
        className="w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0"
      />

      {/* Title */}
      <span
        className={`flex-1 text-sm ${
          task.is_complete ? 'line-through text-gray-400' : 'text-gray-800'
        }`}
      >
        {task.title}
      </span>

      {/* Delete button — visible on row hover */}
      <button
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500
                   transition-opacity text-lg leading-none"
      >
        ×
      </button>
    </li>
  )
}
