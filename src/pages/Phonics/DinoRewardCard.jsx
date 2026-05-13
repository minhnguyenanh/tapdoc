import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  GiftIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import useVoice from "@/hooks/useVoice";
import Confetti from "@/components/Confetti";
import DinoLottie from "./DinoLottie";

// "Thẻ quà" hiển thị sau khi đọc đúng — phần thưởng cho bé.
export default function DinoRewardCard({ phonic, isJungleComplete, onClose }) {
  const { speak, stop } = useVoice();
  const [confettiOnce] = useState(1);

  // Khi mở card: bắn confetti + đọc tên dino. Nếu là card cuối hoàn thành
  // toàn bộ khu rừng → đọc thêm câu chúc mừng full.

  return (
    <motion.div
      key="reward-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <Confetti fire={confettiOnce} />

      {/* Tia sáng phát từ giữa */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.55, 0.4], scale: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background: `radial-gradient(circle, ${phonic.color}55 0%, transparent 65%)`,
        }}
      />

      <motion.div
        initial={{ scale: 0.3, rotate: -10, opacity: 0, y: 40 }}
        animate={{
          scale: 1,
          rotate: 0,
          opacity: 1,
          y: 0,
        }}
        exit={{ scale: 0.6, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 230, damping: 16 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm"
      >
        {/* Ribbon "QUÀ" góc trên */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: -18 }}
          transition={{
            delay: 0.35,
            type: "spring",
            stiffness: 260,
            damping: 14,
          }}
          className="absolute -top-4 -left-4 z-10 px-4 py-1 rounded-xl shadow-lg text-white font-black text-sm tracking-wider flex items-center gap-1"
          style={{ backgroundColor: "#EF4444" }}
        >
          <GiftIcon className="w-4 h-4" />
          CHÚC MỪNG
        </motion.div>

        {/* Card body — kiểu thẻ bài sưu tập */}
        <div
          className="rounded-3xl shadow-2xl border-[6px] p-5 flex flex-col items-center gap-3 overflow-hidden"
          style={{
            borderColor: phonic.color,
            background: `linear-gradient(180deg, #FFFFFF 0%, ${phonic.color}18 100%)`,
          }}
        >
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="absolute top-3 right-3 p-1 rounded-full bg-white/70 hover:bg-white shadow z-10"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>

          {/* Pill phụ âm */}
          <div
            className="px-5 py-1 rounded-full text-white font-black text-2xl shadow-md"
            style={{ backgroundColor: phonic.color }}
          >
            {/* {phonic.text} */}
            Phần thưởng
          </div>

          {/* Khung hình Lottie */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 220,
              damping: 14,
            }}
            className="relative rounded-2xl border-4 bg-white shadow-inner flex items-center justify-center"
            style={{
              borderColor: phonic.color,
              width: 220,
              height: 220,
              backgroundImage:
                "radial-gradient(circle at 50% 40%, #FEF3C7 0%, #FFFFFF 60%)",
            }}
          >
            <DinoLottie
              src={phonic.dino.lottie}
              fallbackEmoji={phonic.dino.emoji}
              size={190}
            />
            {/* Ngôi sao trang trí */}
            <motion.div
              animate={{ rotate: [0, 14, -14, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-3 -right-3"
            >
              <StarIcon className="w-9 h-9 text-yellow-400 drop-shadow" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
              className="absolute -bottom-2 -left-2"
            >
              <SparklesIcon className="w-7 h-7 text-yellow-300 drop-shadow" />
            </motion.div>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-2 px-6 py-3 rounded-2xl text-white font-bold text-lg shadow-lg"
            style={{ backgroundColor: phonic.color }}
          >
            {isJungleComplete ? "OK" : "Tiếp tục hành trình →"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
