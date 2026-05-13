import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tapdoc_phonics_solved";

function loadSolved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

const listeners = new Set();

export default function useSolvedPhonics() {
  const [solved, setSolved] = useState(loadSolved);

  useEffect(() => {
    const cb = (next) => setSolved(next);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  const markSolved = useCallback((id) => {
    setSolved((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* noop */
      }
      listeners.forEach((cb) => cb(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setSolved([]);
    listeners.forEach((cb) => cb([]));
  }, []);

  return { solved, markSolved, reset };
}
