import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid'
import { DAU_THANH } from '@/data/dictionary'
import useVoice from '@/hooks/useVoice'

// Dấu thanh hiển thị (bỏ "ngang" vì không có ký hiệu dấu)
const TONES = DAU_THANH.filter((t) => t.name !== 'ngang')

// Thêm thông tin hiển thị cho mỗi dấu
const TONE_DISPLAY = {
  huyền: { symbol: '\\u0300', label: '`', baseWord: 'ba', tonedWord: 'bà' },
  sắc: { symbol: '\\u0301', label: '´', baseWord: 'ba', tonedWord: 'bá' },
  hỏi: { symbol: '\\u0309', label: '?', baseWord: 'ba', tonedWord: 'bả' },
  ngã: { symbol: '\\u0303', label: '~', baseWord: 'ba', tonedWord: 'bã' },
  nặng: { symbol: '\\u0323', label: '.', baseWord: 'ba', tonedWord: 'bạ' },
}

export default function ToneCard({ onBack }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const { speak, isSpeaking } = useVoice()

  const current = TONES[index]
  const display = TONE_DISPLAY[current.name]

  const goNext = useCallback(() => {
    if (index < TONES.length - 1) {
      setDirection(1)
      setIndex((i) => i + 1)
    }
  }, [index])

  const goBack = useCallback(() => {
    if (index > 0) {
      setDirection(-1)
      setIndex((i) => i - 1)
    }
  }, [index])

  const handleSpeak = () => {
    // Đọc: "ba" rồi "bà"
    speak(`${display.baseWord}... ${display.tonedWord}`)
  }

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button
          onClick={onBack}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-xl font-bold text-amber-800">Thanh điệu</h2>
        <div className="text-lg font-bold text-amber-800">
          {index + 1}/{TONES.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / TONES.length) * 100}%` }}
        />
      </div>

      {/* Card nội dung */}
      <div className="flex-1 flex items-center justify-center overflow-hidden w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.name}
            custom={direction}
            variants={{
              initial: (d) => ({ x: d * 200, opacity: 0 }),
              animate: { x: 0, opacity: 1 },
              exit: (d) => ({ x: d * -200, opacity: 0 }),
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Tên dấu */}
            <div className="text-3xl md:text-4xl font-bold text-purple-500">
              dấu {current.name}
            </div>

            {/* Từ gốc → từ có dấu */}
            <div className="flex items-center gap-4 md:gap-8">
              <span className="text-[6rem] md:text-[10rem] font-bold text-gray-400 leading-none">
                {display.baseWord}
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="text-4xl md:text-6xl text-purple-400"
              >
                →
              </motion.span>
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="text-[6rem] md:text-[10rem] font-bold text-purple-500 leading-none"
              >
                {display.tonedWord}
              </motion.span>
            </div>

            {/* Ví dụ từ dictionary */}
            <div className="text-xl text-gray-500">
              ví dụ: <span className="font-bold text-purple-500">{current.example}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nút nghe */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
        transition={isSpeaking ? { repeat: Infinity, duration: 0.8 } : {}}
        onClick={handleSpeak}
        className="w-20 h-20 rounded-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 shadow-lg flex items-center justify-center transition-colors mb-4"
        aria-label="Nghe phát âm"
      >
        <SpeakerWaveIcon className="w-12 h-12 text-white" />
      </motion.button>

      {/* Nút Back / Next */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goBack}
          disabled={index === 0}
          className="w-20 h-20 rounded-full bg-white border-4 border-amber-400 shadow-lg flex items-center justify-center disabled:opacity-30 disabled:border-gray-300 transition-all"
          aria-label="Quay lại"
        >
          <ArrowLeftIcon className="w-10 h-10 text-amber-500" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goNext}
          disabled={index === TONES.length - 1}
          className="w-20 h-20 rounded-full bg-white border-4 border-amber-400 shadow-lg flex items-center justify-center disabled:opacity-30 disabled:border-gray-300 transition-all"
          aria-label="Tiếp theo"
        >
          <ArrowRightIcon className="w-10 h-10 text-amber-500" />
        </motion.button>
      </div>
    </div>
  )
}
