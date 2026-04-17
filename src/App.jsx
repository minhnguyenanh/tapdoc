import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Alphabet from '@/pages/Alphabet/Alphabet'
import Basic from '@/pages/Basic/Basic'
import Word from '@/pages/Advance/Word'
import Level2 from '@/pages/Advance/Level2'
import LevelPlaceholder from '@/pages/Advance/LevelPlaceholder'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-full min-h-screen bg-[var(--color-bg)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/word" element={<Word />} />
          <Route path="/word/2" element={<Level2 />} />
          <Route path="/word/:levelId" element={<LevelPlaceholder />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
