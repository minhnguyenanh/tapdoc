import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { BASIC_LESSONS, SECTION_META, SECTION_ORDER } from '@/data/basic'
import PageHeader from '@/components/PageHeader'
import useVoice from '@/hooks/useVoice'

// ─── Chọn bài học ───
function LessonSelect({ onSelect, onBack }) {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Đánh vần cơ bản" onBack={onBack} />

      <div className="flex flex-col gap-4 p-6 flex-1 max-w-md mx-auto w-full">
        {BASIC_LESSONS.map((lesson, i) => (
          <motion.button
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(lesson.id)}
            className="flex items-center gap-4 p-5 rounded-2xl border-2 border-yellow-400 bg-yellow-50 shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow">
              {lesson.letter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-500">Bài {lesson.id}</div>
              <div className="text-lg font-bold text-yellow-700">{lesson.title}</div>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// ─── Học toàn bộ bài ───
function LessonLearn({ lesson, onBack }) {
  const { speak, speakPhonetic, speakSlow } = useVoice()
  const [activeItem, setActiveItem] = useState(null)

  const availableSections = SECTION_ORDER.filter(
    (key) => lesson.sections[key] && lesson.sections[key].length > 0
  )

  const handleTap = useCallback((item, sectionKey, customKey) => {
    setActiveItem(customKey ?? `${sectionKey}-${item}`)
    if (sectionKey === 'letter') speakPhonetic(item)
    else if (sectionKey === 'sentences') speakSlow(item)
    else speak(item)
    setTimeout(() => setActiveItem(null), 500)
  }, [speak, speakPhonetic, speakSlow])

  return (
    <div className="flex flex-col h-full">
      <PageHeader title={`Bài ${lesson.id}: ${lesson.title}`} onBack={onBack} />

      <div className="flex flex-col gap-8 p-6 flex-1 max-w-2xl mx-auto w-full">
        {availableSections.map((key, sectionIdx) => {
          const meta = SECTION_META[key]
          const items = lesson.sections[key]
          const isSingleChar = key === 'letter'
          const isSentence = key === 'sentences'

          const itemSize = isSingleChar
            ? 'text-7xl md:text-8xl w-28 h-28 md:w-32 md:h-32'
            : isSentence
              ? 'text-2xl md:text-3xl px-5 py-4'
              : 'text-2xl md:text-3xl px-5 py-4'

          return (
            <motion.section
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
              className={`rounded-2xl border-2 ${meta.borderColor} ${meta.bgColor} p-5 shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${meta.accent} text-white flex items-center justify-center text-lg font-bold shadow`}>
                  {sectionIdx + 1}
                </div>
                <div>
                  <div className={`text-lg font-bold ${meta.color}`}>{meta.title}</div>
                  <div className="text-xs text-gray-500">{meta.desc}</div>
                </div>
              </div>

              {key === 'tones' ? (
                <div className="flex flex-col gap-3">
                  {items.map((row, rowIdx) => (
                    <div key={rowIdx} className="flex flex-wrap gap-3">
                      {row.map((item) => {
                        const itemKey = `${key}-${rowIdx}-${item}`
                        const isActive = activeItem === itemKey
                        return (
                          <motion.button
                            key={itemKey}
                            whileTap={{ scale: 0.9 }}
                            animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                            transition={isActive ? { duration: 0.4 } : {}}
                            onClick={() => handleTap(item, key, itemKey)}
                            className={`font-bold leading-none select-none rounded-xl bg-white shadow hover:shadow-lg active:shadow-sm border-2 ${meta.borderColor} ${meta.color} ${itemSize} transition-shadow`}
                          >
                            {item}
                          </motion.button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`flex flex-wrap gap-3 ${isSentence ? 'flex-col' : ''}`}>
                  {items.map((item) => {
                    const itemKey = `${key}-${item}`
                    const isActive = activeItem === itemKey
                    return (
                      <motion.button
                        key={itemKey}
                        whileTap={{ scale: 0.9 }}
                        animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                        transition={isActive ? { duration: 0.4 } : {}}
                        onClick={() => handleTap(item, key)}
                        className={`font-bold leading-none select-none rounded-xl bg-white shadow hover:shadow-lg active:shadow-sm border-2 ${meta.borderColor} ${meta.color} ${itemSize} ${isSingleChar ? 'flex items-center justify-center' : ''} ${isSentence ? 'text-left' : ''} transition-shadow`}
                      >
                        {item}
                      </motion.button>
                    )
                  })}
                </div>
              )}
            </motion.section>
          )
        })}
      </div>
    </div>
  )
}

// ─── Basic Page ───
export default function Basic() {
  const navigate = useNavigate()
  const [step, setStep] = useState('lesson') // 'lesson' | 'learn'
  const [lessonId, setLessonId] = useState(null)

  const lesson = useMemo(
    () => BASIC_LESSONS.find((l) => l.id === lessonId),
    [lessonId]
  )

  const handleLessonSelect = (id) => {
    setLessonId(id)
    setStep('learn')
  }

  return (
    <div className="h-full min-h-screen">
      <AnimatePresence mode="wait">
        {step === 'lesson' && (
          <motion.div
            key="lesson"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="h-full min-h-screen"
          >
            <LessonSelect
              onSelect={handleLessonSelect}
              onBack={() => navigate('/')}
            />
          </motion.div>
        )}

        {step === 'learn' && lesson && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="h-full min-h-screen"
          >
            <LessonLearn
              lesson={lesson}
              onBack={() => setStep('lesson')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
