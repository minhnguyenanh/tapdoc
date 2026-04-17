import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { getLevel2Words } from '@/data/dictionary'
import useVoice from '@/hooks/useVoice'
import useListening from '@/hooks/useListening'
import SpellingAnimation from '@/components/SpellingAnimation'
import WordCard from '@/components/WordCard'
import Controls from '@/components/Controls'
import Confetti from '@/components/Confetti'
import SyllableBuilder from '@/components/SyllableBuilder'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Chọn chế độ ───
function ModeSelect({ onSelect, onBack }) {
  const modes = [
    { id: 'guided', title: 'Học theo danh sách', desc: 'Từ có sẵn → phân tích → nghe → đọc', color: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-400' },
    { id: 'sandbox', title: 'Ghép tự do', desc: 'Tự chọn phụ âm + nguyên âm + dấu thanh', color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-400' },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-2xl font-bold text-amber-800">Ghép vần xuôi</h2>
        <div className="w-12" />
      </div>

      <div className="flex flex-col gap-4 p-6 flex-1 justify-center max-w-md mx-auto w-full">
        {modes.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mode.id)}
            className={`p-6 rounded-2xl border-2 ${mode.borderColor} ${mode.bgColor} shadow-md text-left`}
          >
            <div className={`text-xl font-bold ${mode.color}`}>{mode.title}</div>
            <div className="text-sm text-gray-500 mt-1">{mode.desc}</div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ─── Chế độ Guided ───
function GuidedLearn({ onBack }) {
  const words = useMemo(() => {
    const unique = [...new Set(getLevel2Words())]
    return shuffle(unique)
  }, [])

  const [index, setIndex] = useState(0)
  const [showWord, setShowWord] = useState(false)
  const [fireConfetti, setFireConfetti] = useState(0)
  const [shake, setShake] = useState(false)

  const { speak, speakSlow, speakCongrats, speakRetry, isSpeaking } = useVoice()
  const { isListening, startListening, stopListening, setExpected, result, reset } = useListening()

  const current = words[index]

  const handleAnimComplete = () => {
    setShowWord(true)
    speakSlow(current)
    setExpected(current)
  }

  const handleSpeak = () => {
    speakSlow(current)
  }

  const handleMicDown = () => {
    reset()
    setShake(false)
    startListening()
  }

  const handleMicUp = () => {
    stopListening()
  }

  const handleNext = () => {
    if (index < words.length - 1) {
      setIndex((i) => i + 1)
      setShowWord(false)
      setShake(false)
      reset()
    }
  }

  // Phản hồi khi có kết quả STT
  const isCorrect = result === true
  const isWrong = result === false

  if (isCorrect && fireConfetti === index) {
    // Chưa bắn confetti cho từ này
  }
  if (isCorrect && fireConfetti !== index + 1) {
    setTimeout(() => {
      speakCongrats()
      setFireConfetti(index + 1)
    }, 0)
  }
  if (isWrong && !shake) {
    setTimeout(() => {
      speakRetry()
      setShake(true)
    }, 0)
  }

  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      <Confetti fire={fireConfetti} />

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button
          onClick={onBack}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-xl font-bold text-amber-800">Học ghép vần</h2>
        <div className="text-lg font-bold text-amber-800">
          {index + 1}/{words.length}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full max-w-lg h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Nội dung */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Animation phân tích */}
            <SpellingAnimation word={current} onComplete={handleAnimComplete} />

            {/* WordCard lớn */}
            {showWord && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                <WordCard word={current} shake={shake} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {showWord && (
        <Controls
          onSpeak={handleSpeak}
          onMicDown={handleMicDown}
          onMicUp={handleMicUp}
          onNext={handleNext}
          isSpeaking={isSpeaking}
          isListening={isListening}
          showNext={isCorrect && index < words.length - 1}
        />
      )}

      <div className="h-6" />
    </div>
  )
}

// ─── Chế độ Sandbox ───
function SandboxMode({ onBack }) {
  const [builtWord, setBuiltWord] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [fireConfetti, setFireConfetti] = useState(0)
  const [shake, setShake] = useState(false)

  const { speakSlow, speakCongrats, speakRetry, isSpeaking } = useVoice()

  const handleWordBuilt = (word, valid) => {
    setBuiltWord(word)
    setIsValid(valid)
    setShake(false)

    if (valid) {
      speakSlow(word)
      speakCongrats()
      setFireConfetti((c) => c + 1)
    } else {
      speakRetry()
      setShake(true)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Confetti fire={fireConfetti} />

      <div className="flex items-center justify-between p-4">
        <button
          onClick={onBack}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-2xl font-bold text-amber-800">Ghép tự do</h2>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <SyllableBuilder onWordBuilt={handleWordBuilt} />

        {/* Thông báo kết quả */}
        {builtWord && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center text-xl font-bold mt-4 p-3 rounded-xl ${
              isValid ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'
            }`}
          >
            {isValid ? `"${builtWord}" - Đúng rồi!` : `"${builtWord}" - Từ chưa có nghĩa, thử lại nào!`}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ─── Level2 Page ───
export default function Level2() {
  const navigate = useNavigate()
  const [step, setStep] = useState('mode') // 'mode' | 'guided' | 'sandbox'

  return (
    <div className="h-full min-h-screen">
      <AnimatePresence mode="wait">
        {step === 'mode' && (
          <motion.div
            key="mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="h-full min-h-screen"
          >
            <ModeSelect
              onSelect={setStep}
              onBack={() => navigate('/word')}
            />
          </motion.div>
        )}

        {step === 'guided' && (
          <motion.div
            key="guided"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="h-full min-h-screen"
          >
            <GuidedLearn onBack={() => setStep('mode')} />
          </motion.div>
        )}

        {step === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="h-full min-h-screen"
          >
            <SandboxMode onBack={() => setStep('mode')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
