import { motion } from 'framer-motion'
import { splitWord, classifyChar } from '@/data/dictionary'

function ColoredWord({ word }) {
  const { phuAm, nguyenAm } = splitWord(word)

  // Tô màu: phụ âm = xanh, phần còn lại (nguyên âm + dấu) = đỏ
  return (
    <>
      {phuAm && (
        <span className="text-red-500">{word.slice(0, phuAm.length)}</span>
      )}
      <span className="text-blue-500">{word.slice(phuAm.length)}</span>
    </>
  )
}

export default function WordCard({ word, shake = false }) {
  return (
    <motion.div
      key={word}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={
        shake
          ? {
              scale: 1,
              opacity: 1,
              x: [0, -20, 20, -20, 20, -10, 10, 0],
            }
          : { scale: 1, opacity: 1, x: 0 }
      }
      transition={
        shake
          ? { duration: 0.5, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 200, damping: 15 }
      }
      className="flex items-center justify-center"
    >
      <span className="font-bold leading-none select-none text-[10rem] md:text-[14rem]">
        <ColoredWord word={word} />
      </span>
    </motion.div>
  )
}
