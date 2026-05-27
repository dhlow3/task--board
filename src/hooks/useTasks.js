import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // ── Fetch all tasks, newest first ─────────────────────────────────
  const fetchTasks = useCallback(async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('fetchTasks error:', error.message)
    } else {
      setTasks(data)
    }
    setLoading(false)
  }, [])

  // ── Create ────────────────────────────────────────────────────────
  async function addTask(title) {
    const { error } = await supabase.from('tasks').insert({ title })
    if (error) console.error('addTask error:', error.message)
    else fetchTasks()
  }

  // ── Toggle complete / incomplete ──────────────────────────────────
  async function toggleComplete(id, currentValue) {
    const { error } = await supabase
      .from('tasks')
      .update({ is_complete: !currentValue })
      .eq('id', id)
    if (error) console.error('toggleComplete error:', error.message)
    else fetchTasks()
  }

  // ── Delete ────────────────────────────────────────────────────────
  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) console.error('deleteTask error:', error.message)
    else fetchTasks()
  }

  // ── Realtime subscription ─────────────────────────────────────────
  useEffect(() => {
    fetchTasks()

    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => fetchTasks()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTasks])

  return { tasks, loading, addTask, toggleComplete, deleteTask }
}
