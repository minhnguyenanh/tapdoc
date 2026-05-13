import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  SunIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";
import useSolvedPhonics from "@/hooks/useSolvedPhonics";
import usePhonicsOrder from "@/hooks/usePhonicsOrder";
import JungleTrail from "./JungleTrail";
import PhonicCard from "./PhonicCard";
import DinoRewardCard from "./DinoRewardCard";

export default function Phonics() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState(null);
  // Khi giải xong trong session, chuyển sang reward view cho cùng phonic
  const [showReward, setShowReward] = useState(false);
  const { solved, markSolved, reset } = useSolvedPhonics();
  const { phonics, shuffleOrder } = usePhonicsOrder();

  const handlePick = (phonic) => {
    setPicked(phonic);
    // Luôn mở PhonicCard để bé đọc lại, kể cả phonic đã solved.
    setShowReward(false);
  };

  const handleClose = () => {
    setPicked(null);
    setShowReward(false);
  };

  const handleSolved = () => {
    if (!picked) return;
    markSolved(picked.id);
    // Delay 1.2s để câu chúc mừng "Giỏi lắm!" phát xong trước khi
    // PhonicCard unmount (cleanup gọi stop() sẽ cắt ngang TTS).
    setTimeout(() => setShowReward(true), 1200);
  };

  // Kiểm tra: card đang giải có phải là card CUỐI cùng để hoàn thành toàn bộ?
  const isLastPhonic =
    picked && solved.length === phonics.length && solved.includes(picked.id);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #DCFCE7 0%, #BBF7D0 35%, #A7F3D0 70%, #FCD34D 100%)",
      }}
    >
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-emerald-700/85 backdrop-blur text-white shadow">
        <button
          onClick={() => navigate("/")}
          aria-label="Quay lại"
          className="p-2"
        >
          <ArrowLeftIcon className="w-7 h-7" />
        </button>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span>🦖</span> Khu rừng khủng long
        </h2>
        <button
          onClick={() => {
            if (confirm("Chơi lại từ đầu?")) {
              reset();
              shuffleOrder();
            }
          }}
          aria-label="Chơi lại"
          className="p-2"
        >
          <ArrowPathIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="h-16" />

      <SunIcon className="absolute top-20 right-4 w-16 h-16 text-yellow-400 pointer-events-none drop-shadow" />
      <CloudIcon className="absolute top-28 left-6 w-12 h-12 text-white/90 pointer-events-none drop-shadow" />

      <div className="pt-4 pb-12 px-2">
        <JungleTrail
          phonics={phonics}
          onPick={handlePick}
          solved={solved}
          width={360}
        />
      </div>

      <AnimatePresence mode="wait">
        {picked && !showReward && (
          <PhonicCard
            key={`practice-${picked.id}`}
            phonic={picked}
            isSolved={false}
            onSolved={handleSolved}
            onClose={handleClose}
          />
        )}
        {picked && showReward && (
          <DinoRewardCard
            key={`reward-${picked.id}`}
            phonic={picked}
            isJungleComplete={isLastPhonic}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
