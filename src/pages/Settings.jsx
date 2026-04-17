import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import useSettings, { pickBestVoice } from "@/hooks/useSettings";
import useVoice from "@/hooks/useVoice";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

const RATE_OPTIONS = [
  { value: 0.5, label: "0.5x (Rất chậm)" },
  { value: 0.75, label: "0.75x (Chậm)" },
  { value: 1, label: "1x (Bình thường)" },
  { value: 1.25, label: "1.25x (Nhanh)" },
  { value: 1.5, label: "1.5x (Rất nhanh)" },
];

export default function Settings() {
  const navigate = useNavigate();
  const { settings, setSettings } = useSettings();
  const { speak } = useVoice();
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!window.speechSynthesis) return;

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const vi = all.filter((v) => v.lang.startsWith("vi"));
      const best = pickBestVoice(all);

      const sorted = [...vi].sort((a, b) => {
        if (best && a.name === best.name) return -1;
        if (best && b.name === best.name) return 1;
        return a.name.localeCompare(b.name);
      });

      setVoices(sorted.slice(0, 10));
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const autoVoice = voices[0];
  const selectValue = settings.voiceName ?? "__auto__";

  const handleVoiceChange = (e) => {
    const value = e.target.value;
    setSettings({ voiceName: value === "__auto__" ? null : value });
  };

  const handleRateChange = (e) => {
    setSettings({ rate: parseFloat(e.target.value) });
  };

  const handleTest = () => {
    speak("Xin chào, đây là giọng đọc mẫu");
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <PageHeader title="Cài đặt" onBack={() => navigate("/")} />

      <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-amber-800">
            Giọng đọc
          </label>
          <select
            value={selectValue}
            onChange={handleVoiceChange}
            className="p-3 rounded-xl border-2 border-amber-300 bg-white text-amber-900 text-lg focus:outline-none focus:border-amber-500"
          >
            <option value="__auto__">
              Tự động{autoVoice ? ` (${autoVoice.name})` : ""}
            </option>
            {settings.voiceName &&
              !voices.some((v) => v.name === settings.voiceName) && (
                <option value={settings.voiceName}>
                  {settings.voiceName} (không khả dụng)
                </option>
              )}
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-amber-800">
            Tốc độ đọc
          </label>
          <select
            value={settings.rate}
            onChange={handleRateChange}
            className="p-3 rounded-xl border-2 border-amber-300 bg-white text-amber-900 text-lg focus:outline-none focus:border-amber-500"
          >
            {RATE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTest}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-amber-500 text-white font-bold text-lg shadow-md hover:bg-amber-600 transition-colors"
        >
          <SpeakerWaveIcon className="w-6 h-6" />
          Nghe thử
        </button>
      </div>
    </div>
  );
}
