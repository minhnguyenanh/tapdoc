import { useEffect, useReducer, useRef } from "react";
import { motion } from "framer-motion";
import {
  XMarkIcon,
  SpeakerWaveIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";
import useVoice from "@/hooks/useVoice";
import useListening from "@/hooks/useListening";

function reducer(state, action) {
  switch (action.type) {
    case "wrong":
      return { ...state, shake: true };
    case "shake_done":
      return { ...state, shake: false };
    case "reset_shake":
      return { ...state, shake: false };
    default:
      return state;
  }
}

export default function PhonicCard({ phonic, onSolved, onClose }) {
  const [state, dispatch] = useReducer(reducer, { shake: false });
  const { shake } = state;

  const { speak, speakSlow, speakCongrats, speakRetry, isSpeaking, stop } =
    useVoice();
  const {
    isListening,
    startListening,
    stopListening,
    setExpected,
    result,
    reset,
    transcript,
    isSupported: sttSupported,
  } = useListening();

  // STT target = các biến thể phụ âm có thể được STT trả về (ch/tr nới lỏng lẫn nhau)
  // Không auto-phát âm khi mở card — TTS sẽ chiếm audio device và làm STT
  // không nhận diện được khi bé bấm mic. Bé tự bấm nút 🔉 nếu muốn nghe mẫu.
  useEffect(() => {
    setExpected(phonic.accepts || [phonic.spoken]);
    return () => {
      stop();
    };
  }, [phonic, stop, setExpected]);

  // Chỉ xử lý transition của STT đúng 1 lần mỗi lượt nghe
  const lastResultRef = useRef(null);
  const solvedRef = useRef(false);
  useEffect(() => {
    if (result === lastResultRef.current) return;
    lastResultRef.current = result;
    if (result === true) {
      if (!solvedRef.current) {
        solvedRef.current = true;
        speakCongrats();
        onSolved?.();
      }
    } else if (result === false) {
      dispatch({ type: "wrong" });
      speakRetry();
      const t = setTimeout(() => dispatch({ type: "shake_done" }), 600);
      return () => clearTimeout(t);
    }
  }, [result, speakCongrats, speakRetry, onSolved]);

  const handleSpeakPhonic = () => speak(phonic.spoken);
  const handleSpeakHint = () => speakSlow(phonic.example.word);

  const handleMicDown = () => {
    console.log("[Mic] down", {
      sttSupported,
      speechSynthSpeaking:
        typeof window !== "undefined" && window.speechSynthesis?.speaking,
      isSpeaking,
    });
    if (!sttSupported) {
      speak(phonic.spoken);
      return;
    }
    stop();
    reset();
    dispatch({ type: "reset_shake" });
    startListening();
  };
  const handleMicUp = () => {
    console.log("[Mic] up");
    stopListening();
  };

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={
          shake
            ? { scale: 1, opacity: 1, y: 0, x: [0, -14, 14, -14, 14, -6, 6, 0] }
            : { scale: 1, opacity: 1, y: 0 }
        }
        exit={{ scale: 0.7, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl border-4 p-6 flex flex-col items-center gap-4"
        style={{ borderColor: phonic.color }}
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100"
        >
          <XMarkIcon className="w-7 h-7 text-gray-400" />
        </button>

        {/* Emoji gợi ý lớn */}
        <div
          className="rounded-2xl p-2  flex items-center justify-center"
          style={{
            borderColor: phonic.color,
            backgroundColor: `${phonic.color}10`,
            width: 168,
            height: 168,
          }}
        >
          <div className="text-[7rem] leading-none select-none">
            {phonic.example.emoji}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className="text-7xl font-black leading-none"
            style={{ color: phonic.color }}
          >
            <span style={{ textTransform: "uppercase" }}>{phonic.text}</span>
            &nbsp;-&nbsp;
            <span>{phonic.text}</span>
          </div>
        </div>

        {/* Gợi ý từ */}
        <div
          className="rounded-2xl p-2 flex items-center gap-3"
          style={{
            width: 168,
            backgroundColor: `${phonic.color}14`,
            textAlign: "center",
          }}
        >
          <div className="text-xl font-bold flex-1 text-gray-500">
            {(() => {
              const word = phonic.example.word;
              const idx = word.toLowerCase().indexOf(phonic.text.toLowerCase());
              if (idx === -1) return word;
              const before = word.slice(0, idx);
              const match = word.slice(idx, idx + phonic.text.length);
              const after = word.slice(idx + phonic.text.length);
              return (
                <>
                  {before}
                  <span
                    style={{ color: phonic.color, textDecoration: "underline" }}
                  >
                    {match}
                  </span>
                  {after}
                </>
              );
            })()}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-1">
          <div className="text-sm text-gray-500 font-medium">
            Nhấn giữ micro và đọc to
            <strong style={{ color: phonic.color }}>"chữ {phonic.text}"</strong>
          </div>

          <div className="flex items-center justify-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
              transition={isSpeaking ? { repeat: Infinity, duration: 0.8 } : {}}
              onClick={handleSpeakPhonic}
              className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-md text-white"
              style={{ backgroundColor: phonic.color }}
              aria-label="Nghe âm mẫu"
            >
              <SpeakerWaveIcon className="w-8 h-8" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={
                isListening
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(239,68,68,0.45)",
                        "0 0 0 18px rgba(239,68,68,0)",
                        "0 0 0 0 rgba(239,68,68,0.45)",
                      ],
                    }
                  : {}
              }
              transition={
                isListening ? { repeat: Infinity, duration: 1.2 } : {}
              }
              onPointerDown={handleMicDown}
              onPointerUp={handleMicUp}
              onPointerLeave={handleMicUp}
              className={`flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition-colors ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-white border-4 border-red-400 text-red-500"
              }`}
              aria-label="Nhấn giữ để nói"
            >
              <MicrophoneIcon className="w-10 h-10" />
            </motion.button>
          </div>
        </div>

        {result === false && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 font-bold"
          >
            {transcript ? "Thử lại nhé!" : "Chưa nghe rõ, thử lại"}
          </motion.div>
        )}

        {/* Debug: STT thực sự nghe được gì */}
        {/* {transcript && (
          <div className="text-xs text-gray-400 mt-1">
            Máy nghe: <span className="font-mono">"{transcript}"</span>
          </div>
        )} */}
        {!sttSupported && (
          <div className="text-xs text-orange-500 mt-1">
            Trình duyệt này không hỗ trợ nhận diện giọng nói
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
