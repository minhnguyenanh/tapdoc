import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tapdoc_settings";

export const DEFAULT_SETTINGS = {
  voiceName: null,
  rate: 1,
};

const PREFERRED_VOICES = [
  "Google Lê",
  "Google tiếng Việt",
  "vi-vn-x-gfl",
  "vi-vn-x-gfg",
  "Linh",
  "HoaiMy",
];

export function pickBestVoice(voices) {
  const vi = voices.filter((v) => v.lang.startsWith("vi"));
  if (vi.length === 0) return null;

  for (const name of PREFERRED_VOICES) {
    const found = vi.find((v) => v.name === name) ||
      vi.find((v) => v.name.includes(name));
    if (found) return found;
  }

  const female = vi.find(
    (v) =>
      /female|woman|nữ/i.test(v.name) ||
      /HoaiMy|Linh|Mai|Lan|Hoa|Lê/i.test(v.name),
  );
  return female || vi[0];
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const listeners = new Set();

export default function useSettings() {
  const [settings, setSettingsState] = useState(loadSettings);

  useEffect(() => {
    const cb = (next) => setSettingsState(next);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  const setSettings = useCallback((updater) => {
    setSettingsState((prev) => {
      const next =
        typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      saveSettings(next);
      listeners.forEach((cb) => cb !== setSettingsState && cb(next));
      return next;
    });
  }, []);

  return { settings, setSettings };
}

export function getStoredSettings() {
  return loadSettings();
}
