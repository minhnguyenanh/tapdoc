import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

const LEVEL_INFO = {
  2: { title: 'Ghép vần xuôi', color: 'text-yellow-700' },
  3: { title: 'Phụ âm ghép', color: 'text-blue-700' },
  4: { title: 'Vần đóng', color: 'text-orange-700' },
  5: { title: 'Vần phức tạp', color: 'text-purple-700' },
}

export default function LevelPlaceholder() {
  const navigate = useNavigate()
  const { levelId } = useParams()
  const info = LEVEL_INFO[levelId] || { title: 'Chưa có', color: 'text-gray-700' }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen gap-6 p-6">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/word')}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <h1 className={`text-4xl font-bold ${info.color}`}>
          {info.title}
        </h1>
      </motion.div>
      <p className="text-xl text-gray-500">Đang phát triển...</p>
    </div>
  )
}
