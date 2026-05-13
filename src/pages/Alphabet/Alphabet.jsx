import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import useVoice from "@/hooks/useVoice";

const ALPHABET = [
  "a",
  "ă",
  "â",
  "b",
  "c",
  "d",
  "đ",
  "e",
  "ê",
  "g",
  "h",
  "i",
  "k",
  "l",
  "m",
  "n",
  "o",
  "ô",
  "ơ",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "ư",
  "v",
  "x",
  "y",
];

const LETTERS = ALPHABET.map((c) => ({
  key: `letter-${c}`,
  label: c,
  speakAs: "phonetic",
  spoken: c,
  color: "text-amber-700",
  borderColor: "border-amber-300",
}));

const UPPER_LETTERS = ALPHABET.map((c) => ({
  key: `letter-upper-${c}`,
  label: c.toUpperCase(),
  speakAs: "phonetic",
  spoken: c,
  color: "text-sky-700",
  borderColor: "border-sky-300",
}));

const TONES = [
  { name: "huyền", label: "`" },
  { name: "sắc", label: "´" },
  { name: "hỏi", label: "?" },
  { name: "ngã", label: "~" },
  { name: "nặng", label: "." },
].map((t) => ({
  key: `tone-${t.name}`,
  label: t.label,
  speakAs: "speak",
  spoken: `dấu ${t.name}`,
  color: "text-purple-500",
  borderColor: "border-purple-300",
}));

export default function Alphabet() {
  const navigate = useNavigate();
  const { speak, speakPhonetic } = useVoice();
  const [activeKey, setActiveKey] = useState(null);

  const handleTap = useCallback(
    (item) => {
      setActiveKey(item.key);
      if (item.speakAs === "phonetic") speakPhonetic(item.spoken);
      else speak(item.spoken);
      setTimeout(() => setActiveKey(null), 500);
    },
    [speak, speakPhonetic],
  );

  const renderButton = (item) => {
    const isActive = activeKey === item.key;
    return (
      <motion.button
        key={item.key}
        whileTap={{ scale: 0.9 }}
        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
        transition={isActive ? { duration: 0.4 } : {}}
        onClick={() => handleTap(item)}
        className={`font-bold leading-none select-none rounded-xl bg-white shadow hover:shadow-lg active:shadow-sm border-2 ${item.borderColor} ${item.color} text-2xl md:text-3xl px-5 py-4 flex items-center justify-center transition-shadow`}
      >
        {item.label}
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-screen">
      <PageHeader title="Bảng chữ cái" onBack={() => navigate("/")} />

      <div className="flex flex-col gap-6 p-6 flex-1 max-w-2xl mx-auto w-full">
        <div className="flex flex-wrap gap-3 justify-start">
          {LETTERS.map(renderButton)}
        </div>
        <div className="flex flex-wrap gap-3 justify-start">
          {UPPER_LETTERS.map(renderButton)}
        </div>
        <div className="flex flex-wrap gap-3 justify-start">
          {TONES.map(renderButton)}
        </div>
      </div>
    </div>
  );
}
