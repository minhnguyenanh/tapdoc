import 'regenerator-runtime/runtime'
import { useState, useCallback, useRef, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function normalize(str) {
  return str.toLowerCase().trim().replace(/[.,!?;:\s]+/g, ' ').trim()
}

// Bỏ dấu thanh tiếng Việt + chuẩn hóa nguyên âm về dạng không dấu.
// Giúp khớp khi STT trả về "trở", "trớ", "tro" cho cùng âm "trờ".
function stripDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
}

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

export default function useListening() {
  const [result, setResult] = useState(null) // null = chưa kiểm tra, true/false
  const expectedRef = useRef('')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const isSupported = browserSupportsSpeechRecognition

  const startListening = useCallback(() => {
    console.log('[STT] startListening called')
    resetTranscript()
    setResult(null)
    SpeechRecognition.startListening({ language: 'vi-VN', continuous: false })
  }, [resetTranscript])

  const stopListening = useCallback(() => {
    console.log('[STT] stopListening called')
    SpeechRecognition.stopListening()
  }, [])

  const compare = useCallback((expected) => {
    const expectedList = Array.isArray(expected) ? expected : [expected]
    const normalTranscript = normalize(transcript)
    console.log('[STT compare]', { transcript, normalTranscript, expectedList })
    if (!normalTranscript) return null

    const strippedTranscript = stripDiacritics(normalTranscript)
    const transcriptWords = [
      ...normalTranscript.split(' '),
      ...strippedTranscript.split(' '),
    ]

    for (const exp of expectedList) {
      const normalExpected = normalize(exp)
      const strippedExpected = stripDiacritics(normalExpected)
      const tolerance = strippedExpected.length <= 2 ? 0 : 1

      // Exact / contains (cả 2 dạng có/không dấu)
      if (
        normalTranscript === normalExpected ||
        normalTranscript.includes(normalExpected) ||
        strippedTranscript === strippedExpected ||
        strippedTranscript.includes(strippedExpected)
      ) {
        return true
      }

      // Levenshtein toàn câu (đã strip dấu)
      if (levenshtein(strippedTranscript, strippedExpected) <= tolerance) {
        return true
      }

      // Từng từ. Chỉ cho startsWith khi expected đủ dài để tránh match nhầm
      // (vd "chữ" startsWith "ch" sẽ pass mọi từ bắt đầu bằng ch).
      const allowStartsWith = strippedExpected.length >= 3
      for (const w of transcriptWords) {
        if (!w) continue
        const ws = stripDiacritics(w)
        if (
          w === normalExpected ||
          ws === strippedExpected ||
          (allowStartsWith && ws.startsWith(strippedExpected)) ||
          levenshtein(ws, strippedExpected) <= tolerance
        ) {
          return true
        }
      }
    }

    return false
  }, [transcript])

  // Tự động so sánh khi ngừng nghe
  // Quan trọng: kể cả khi transcript rỗng cũng phải setResult(false) để UI
  // báo cho user, thay vì im lặng (đó chính là cảm giác "đọc gì cũng không được").
  const sawListeningRef = useRef(false)
  useEffect(() => {
    console.log('[STT] listening effect', { listening, transcript, sawListening: sawListeningRef.current })
    if (listening) {
      sawListeningRef.current = true
      return
    }
    if (!sawListeningRef.current) return
    sawListeningRef.current = false
    if (!expectedRef.current) return
    if (!transcript) {
      setResult(false)
      return
    }
    setResult(compare(expectedRef.current))
  }, [listening, transcript, compare])

  const setExpected = useCallback((word) => {
    expectedRef.current = word
  }, [])

  const reset = useCallback(() => {
    resetTranscript()
    setResult(null)
  }, [resetTranscript])

  return {
    isListening: listening,
    transcript,
    result,
    isSupported,
    startListening,
    stopListening,
    setExpected,
    reset,
  }
}
