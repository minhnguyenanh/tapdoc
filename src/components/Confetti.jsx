import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function Confetti({ fire }) {
  useEffect(() => {
    if (!fire) return

    const duration = 2000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#ff0000', '#ffcc00', '#00ff00', '#0066ff'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#ff0000', '#ffcc00', '#00ff00', '#0066ff'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [fire])

  return null
}
