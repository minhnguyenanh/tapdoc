import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

const SUB_LEVELS = [
  {
    id: 2,
    path: '/word/2',
    title: 'Ghép vần xuôi',
    desc: 'Phụ âm + nguyên âm + dấu thanh',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-400',
    bgLight: 'bg-yellow-50',
  },
  {
    id: 3,
    path: '/word/3',
    title: 'Phụ âm ghép',
    desc: 'ch, nh, ph, th, tr, kh...',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-400',
    bgLight: 'bg-blue-50',
  },
  {
    id: 4,
    path: '/word/4',
    title: 'Vần đóng',
    desc: 'Vần có phụ âm cuối: an, am, ong...',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-400',
    bgLight: 'bg-orange-50',
  },
  {
    id: 5,
    path: '/word/5',
    title: 'Vần phức tạp',
    desc: 'Nguyên âm đôi, âm đệm, vần khó',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-400',
    bgLight: 'bg-purple-50',
  },
]

export default function Word() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 text-amber-800"
        >
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-2xl font-bold text-amber-800">Cấu tạo từ</h2>
        <div className="w-12" />
      </div>

      <div className="flex flex-col gap-4 p-6 flex-1 max-w-md mx-auto w-full">
        {SUB_LEVELS.map((sub, i) => (
          <motion.button
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(sub.path)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${sub.borderColor} ${sub.bgLight} shadow-md hover:shadow-lg transition-shadow text-left`}
          >
            <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${sub.color} text-white flex items-center justify-center text-2xl font-bold shadow`}>
              {sub.id}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-lg font-bold ${sub.textColor}`}>
                {sub.title}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">{sub.desc}</div>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
