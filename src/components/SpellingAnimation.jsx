import { motion } from 'framer-motion'
import { splitWord } from '@/data/dictionary'

/**
 * Animation phân tích cấu trúc từ: phụ âm + nguyên âm + dấu thanh
 * Hiển thị từng thành phần bay vào rồi ghép lại
 */
export default function SpellingAnimation({ word, onComplete }) {
  const { phuAm, nguyenAm, dauThanh } = splitWord(word)

  const parts = [
    { text: phuAm, color: 'text-blue-500', label: 'phụ âm', delay: 0 },
    { text: nguyenAm, color: 'text-red-500', label: 'nguyên âm', delay: 0.4 },
    { text: dauThanh !== 'ngang' ? dauThanh : '', color: 'text-purple-500', label: 'dấu', delay: 0.8 },
  ].filter((p) => p.text)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phân tích */}
      <div className="flex items-center gap-3 md:gap-6 text-3xl md:text-5xl font-bold">
        {parts.map((part, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -40, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: part.delay, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-1"
          >
            <span className={part.color}>{part.text}</span>
            <span className="text-xs text-gray-400 font-normal">{part.label}</span>
          </motion.div>
        ))}

        {parts.length > 1 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-gray-400 text-2xl"
          >
            =
          </motion.span>
        )}

        {/* Từ hoàn chỉnh */}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
          onAnimationComplete={onComplete}
          className="text-amber-700 text-4xl md:text-6xl"
        >
          {word}
        </motion.span>
      </div>
    </div>
  )
}
