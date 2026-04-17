import 'regenerator-runtime/runtime'
import { useState, useCallback, useRef, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

function normalize(str) {
  return str.toLowerCase().trim().replace(/[.,!?;:\s]+/g, ' ').trim()
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
    resetTranscript()
    setResult(null)
    SpeechRecognition.startListening({ language: 'vi-VN', continuous: false })
  }, [resetTranscript])

  const stopListening = useCallback(() => {
    SpeechRecognition.stopListening()
  }, [])

  const compare = useCallback((expected) => {
    const normalExpected = normalize(expected)
    const normalTranscript = normalize(transcript)

    if (!normalTranscript) return null

    // Exact match
    if (normalTranscript === normalExpected) return true

    // Transcript chứa expected
    if (normalTranscript.includes(normalExpected)) return true

    // Fuzzy match: cho phép sai 1 ký tự
    if (levenshtein(normalTranscript, normalExpected) <= 1) return true

    // Kiểm tra từng từ trong transcript
    const words = normalTranscript.split(' ')
    for (const w of words) {
      if (w === normalExpected || levenshtein(w, normalExpected) <= 1) return true
    }

    return false
  }, [transcript])

  // Tự động so sánh khi ngừng nghe và có transcript
  useEffect(() => {
    if (!listening && transcript && expectedRef.current) {
      const isCorrect = compare(expectedRef.current)
      setResult(isCorrect)
    }
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
