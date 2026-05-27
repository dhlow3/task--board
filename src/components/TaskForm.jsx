import { useState } from 'react'

export function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium
                   hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        Add
      </button>
    </form>
  )
}
