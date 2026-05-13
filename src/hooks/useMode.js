import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'tapdoc_mode'
export const MODES = { LISTEN: 'listen', SPEAK: 'speak' }
const DEFAULT_MODE = MODES.LISTEN

function loadMode() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === MODES.LISTEN || raw === MODES.SPEAK) return raw
  } catch {
    /* noop */
  }
  return DEFAULT_MODE
}

const listeners = new Set()

export default function useMode() {
  const [mode, setModeState] = useState(loadMode)

  useEffect(() => {
    const cb = (next) => setModeState(next)
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
    }
  }, [])

  const setMode = useCallback((next) => {
    if (next !== MODES.LISTEN && next !== MODES.SPEAK) return
    localStorage.setItem(STORAGE_KEY, next)
    setModeState(next)
    listeners.forEach((cb) => cb !== setModeState && cb(next))
  }, [])

  return { mode, setMode }
}
