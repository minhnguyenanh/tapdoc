import { useState } from 'react'
import { motion } from 'framer-motion'
import { PHU_AM_DON, PHU_AM_GHEP, NGUYEN_AM_DON, DAU_THANH, buildWord, checkValidWord } from '@/data/dictionary'

function PickerColumn({ title, items, selected, onSelect, color }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      <h3 className={`text-sm font-bold uppercase tracking-wide ${color}`}>{title}</h3>
      <div className="flex flex-wrap justify-center gap-2 max-h-[40vh] overflow-y-auto p-2">
        {items.map((item) => {
          const value = typeof item === 'object' ? item.name : item
          const label = typeof item === 'object' ? item.name : item
          const isSelected = selected === value
          return (
            <motion.button
              key={value}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(value)}
              className={`min-w-[3rem] px-3 py-3 rounded-xl text-xl font-bold transition-all ${
                isSelected
                  ? `${color === 'text-red-500' ? 'bg-red-500' : color === 'text-blue-500' ? 'bg-blue-500' : 'bg-purple-500'} text-white shadow-lg scale-110`
                  : 'bg-white shadow-md hover:shadow-lg'
              }`}
            >
              {label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function SyllableBuilder({ onWordBuilt }) {
  const [phuAm, setPhuAm] = useState('')
  const [nguyenAm, setNguyenAm] = useState('')
  const [dauThanh, setDauThanh] = useState('ngang')

  const allPhuAm = [...PHU_AM_DON, ...PHU_AM_GHEP]
  const word = phuAm || nguyenAm ? buildWord(phuAm, nguyenAm, dauThanh) : ''
  const isValid = phuAm && nguyenAm && checkValidWord(phuAm, nguyenAm, dauThanh)

  const handleCheck = () => {
    if (!nguyenAm) return
    onWordBuilt(word, isValid)
  }

  const handleReset = () => {
    setPhuAm('')
    setNguyenAm('')
    setDauThanh('ngang')
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Hiển thị kết quả ghép */}
      <motion.div
        key={word}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-[6rem] md:text-[8rem] font-bold leading-none min-h-[10rem] flex items-center justify-center"
      >
        {word ? (
          <>
            <span className="text-red-500">{word.slice(0, phuAm.length)}</span>
            <span className="text-blue-500">{word.slice(phuAm.length)}</span>
          </>
        ) : (
          <span className="text-gray-300">?</span>
        )}
      </motion.div>

      {/* 3 cột chọn */}
      <div className="flex gap-4 w-full max-w-2xl px-2">
        <PickerColumn
          title="Phụ âm"
          items={allPhuAm}
          selected={phuAm}
          onSelect={setPhuAm}
          color="text-red-500"
        />
        <PickerColumn
          title="Nguyên âm"
          items={NGUYEN_AM_DON}
          selected={nguyenAm}
          onSelect={setNguyenAm}
          color="text-blue-500"
        />
        <PickerColumn
          title="Dấu thanh"
          items={DAU_THANH}
          selected={dauThanh}
          onSelect={setDauThanh}
          color="text-purple-500"
        />
      </div>

      {/* Nút kiểm tra + reset */}
      <div className="flex gap-4 mt-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="px-8 py-4 rounded-2xl bg-gray-300 hover:bg-gray-400 text-xl font-bold shadow-md transition-colors"
        >
          Xoá
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleCheck}
          disabled={!nguyenAm}
          className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 disabled:bg-gray-200 disabled:text-gray-400 text-xl font-bold shadow-md transition-colors"
        >
          Kiểm tra
        </motion.button>
      </div>
    </div>
  )
}
