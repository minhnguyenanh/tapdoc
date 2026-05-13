import { useState, useEffect, useCallback, useRef } from "react";
import { getPhonetic } from "@/data/dictionary";
import useSettings, { pickBestVoice } from "@/hooks/useSettings";

export default function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const voiceRef = useRef(null);
  const { settings } = useSettings();
  const rateRef = useRef(settings.rate);
  const voiceNameRef = useRef(settings.voiceName);

  useEffect(() => {
    rateRef.current = settings.rate;
    voiceNameRef.current = settings.voiceName;
  }, [settings.rate, settings.voiceName]);

  useEffect(() => {
    if (!window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const viVoices = voices.filter((v) => v.lang.startsWith("vi"));

      let picked = null;
      const selectedName = voiceNameRef.current;
      if (selectedName) {
        picked =
          viVoices.find((v) => v.name === selectedName) ||
          viVoices.find((v) => v.name.includes(selectedName));
      }

      if (!picked) {
        picked = pickBestVoice(voices);
      }

      voiceRef.current = picked;
    };

    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
    };
  }, [settings.voiceName]);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const padded = " " + text + " ";
    const utterance = new SpeechSynthesisUtterance(padded);
    utterance.lang = "vi-VN";
    utterance.rate = 0.6 * (rateRef.current || 1);
    utterance.pitch = 1.1;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakSlow = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const padded = " " + text + " ";
    const utterance = new SpeechSynthesisUtterance(padded);
    utterance.lang = "vi-VN";
    utterance.rate = 0.5 * (rateRef.current || 1);
    utterance.pitch = 1.1;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakPhonetic = useCallback((letter) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const phonetic = getPhonetic(letter);

    // Workaround: "ê" bị Google Lê đọc thành "kê"
    // "i" bị đọc thành "i ngắn", "y" bị đọc thành "y dài" (tên chữ cái)
    // "pờ" đứng một mình bị đọc thành "tờ"
    // Trick: phát utterance câm (volume 0) trước, rồi phát thật sau
    // Utterance đầu hấp thụ lỗi ghép vần / đọc tên chữ, utterance sau đọc đúng
    const needsDecoy =
      phonetic === "ê" ||
      phonetic === "i" ||
      phonetic === "y" ||
      phonetic === "pờ";

    if (needsDecoy) {
      const decoy = new SpeechSynthesisUtterance(phonetic);
      decoy.lang = "vi-VN";
      decoy.rate = 1;
      decoy.volume = 0;
      if (voiceRef.current) decoy.voice = voiceRef.current;

      decoy.onstart = () => setIsSpeaking(true);
      decoy.onend = () => {}; // chờ utterance thật
      window.speechSynthesis.speak(decoy);
    }

    const utterance = new SpeechSynthesisUtterance(" " + phonetic + " ");
    utterance.lang = "vi-VN";
    utterance.rate = 0.8 * (rateRef.current || 1);
    utterance.pitch = 1.1;
    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const speakCongrats = useCallback(() => {
    const phrases = [
      "Bốp Giỏi lắm!",
      "Bạn Bốp Tuyệt vời!",
      "Bốp ơi đúng rồi!",
      "Hay quá Bốp ơi!",
      "Chính xác!",
    ];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    speak(phrase);
  }, [speak]);

  const speakRetry = useCallback(() => {
    const phrases = ["Thử lại nào!", "Cố lên!", "Gần đúng rồi!"];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    speak(phrase);
  }, [speak]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    speak,
    speakPhonetic,
    speakSlow,
    speakCongrats,
    speakRetry,
    stop,
    isSpeaking,
    isSupported,
  };
}
