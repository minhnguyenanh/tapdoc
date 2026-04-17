import { useState, useCallback } from 'react'

const STORAGE_KEY = 'tapdoc_progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * Hook quản lý tiến độ học tập, lưu vào localStorage.
 *
 * Cấu trúc:
 * {
 *   "level1": { "1.1": { completed: ["a","ă"], total: 12 }, ... },
 *   "level2": { ... },
 *   "lastLevel": "level1",
 *   "lastDate": "2026-04-17"
 * }
 */
export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const markCompleted = useCallback((level, subLevel, item) => {
    setProgress((prev) => {
      const next = { ...prev }
      if (!next[level]) next[level] = {}
      if (!next[level][subLevel]) next[level][subLevel] = { completed: [], total: 0 }

      const sub = { ...next[level][subLevel] }
      const completed = [...sub.completed]
      if (!completed.includes(item)) {
        completed.push(item)
      }
      sub.completed = completed
      next[level] = { ...next[level], [subLevel]: sub }
      next.lastLevel = level
      next.lastDate = new Date().toISOString().slice(0, 10)

      saveProgress(next)
      return next
    })
  }, [])

  const setTotal = useCallback((level, subLevel, total) => {
    setProgress((prev) => {
      const next = { ...prev }
      if (!next[level]) next[level] = {}
      if (!next[level][subLevel]) next[level][subLevel] = { completed: [], total: 0 }
      next[level][subLevel] = { ...next[level][subLevel], total }

      saveProgress(next)
      return next
    })
  }, [])

  const getSubProgress = useCallback((level, subLevel) => {
    const sub = progress[level]?.[subLevel]
    if (!sub) return { completed: [], total: 0, percent: 0 }
    const percent = sub.total > 0 ? Math.round((sub.completed.length / sub.total) * 100) : 0
    return { ...sub, percent }
  }, [progress])

  const getLevelPercent = useCallback((level) => {
    const levelData = progress[level]
    if (!levelData) return 0

    let totalItems = 0
    let completedItems = 0
    for (const [key, sub] of Object.entries(levelData)) {
      if (key === 'completed' || key === 'total') continue
      if (sub.total) totalItems += sub.total
      if (sub.completed) completedItems += sub.completed.length
    }

    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  }, [progress])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({})
  }, [])

  return {
    progress,
    markCompleted,
    setTotal,
    getSubProgress,
    getLevelPercent,
    resetProgress,
  }
}
