import { useCallback, useEffect, useState } from "react";
import { PHONICS_DATA } from "@/data/phonics";

const STORAGE_KEY = "tapdoc_phonics_order";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadOrder() {
  const allIds = PHONICS_DATA.map((p) => p.id);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (
        Array.isArray(arr) &&
        arr.length === allIds.length &&
        arr.every((id) => allIds.includes(id))
      ) {
        return arr;
      }
    }
  } catch {
    /* noop */
  }
  // Lần đầu hoặc data hỏng: giữ thứ tự gốc
  return allIds;
}

const listeners = new Set();

export default function usePhonicsOrder() {
  const [order, setOrderState] = useState(loadOrder);

  useEffect(() => {
    const cb = (next) => setOrderState(next);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  const shuffleOrder = useCallback(() => {
    const allIds = PHONICS_DATA.map((p) => p.id);
    const next = shuffle(allIds);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* noop */
    }
    setOrderState(next);
    listeners.forEach((cb) => cb(next));
  }, []);

  // Phonics sắp xếp theo `order`
  const phonics = order
    .map((id) => PHONICS_DATA.find((p) => p.id === id))
    .filter(Boolean);

  return { order, phonics, shuffleOrder };
}
