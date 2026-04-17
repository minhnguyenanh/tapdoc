import { motion } from 'framer-motion'

export default function Controls({
  onSpeak,
  onMicDown,
  onMicUp,
  onNext,
  isSpeaking,
  isListening,
  showNext,
}) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* Nút Loa - Nghe đọc mẫu */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
        transition={isSpeaking ? { repeat: Infinity, duration: 0.8 } : {}}
        onClick={onSpeak}
        className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-lg text-4xl transition-colors"
        aria-label="Nghe đọc mẫu"
      >
        🔊
      </motion.button>

      {/* Nút Micro - Hold to talk */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={
          isListening
            ? { boxShadow: ['0 0 0 0 rgba(239,68,68,0.4)', '0 0 0 20px rgba(239,68,68,0)', '0 0 0 0 rgba(239,68,68,0.4)'] }
            : {}
        }
        transition={isListening ? { repeat: Infinity, duration: 1.2 } : {}}
        onPointerDown={onMicDown}
        onPointerUp={onMicUp}
        onPointerLeave={onMicUp}
        className={`flex items-center justify-center w-24 h-24 rounded-full shadow-lg text-5xl transition-colors ${
          isListening
            ? 'bg-red-500 text-white'
            : 'bg-white hover:bg-gray-100 active:bg-gray-200 border-4 border-red-400'
        }`}
        aria-label="Nhấn giữ để nói"
      >
        🎙️
      </motion.button>

      {/* Nút Tiếp theo */}
      {showNext && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-lg text-4xl text-white transition-colors"
          aria-label="Từ tiếp theo"
        >
          ➡️
        </motion.button>
      )}
    </div>
  )
}
