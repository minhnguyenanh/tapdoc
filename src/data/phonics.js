// Lottie URLs từ LottieFiles (public CDN). Nếu fetch lỗi, dino emoji fallback sẽ hiện.
// Mỗi phụ âm gắn 1 loài khủng long khác nhau (tên + emoji fallback).
//
// `accepts`: danh sách các biến thể STT có thể trả về và VẪN coi là đúng.
// Chỉ nới lỏng cho cặp ch/tr (trẻ rất hay lẫn lộn, STT cũng vậy). Các phụ âm
// khác vẫn kiểm tra chính xác để bé không nhầm âm.
const CH_TR_VARIANTS = [
  "chờ",
  "chở",
  "chợ",
  "chớ",
  "chò",
  "cho",
  "trờ",
  "trở",
  "trợ",
  "trớ",
  "trò",
  "tro",
];
const VARIANTS_OF = {
  ch: CH_TR_VARIANTS,
  tr: CH_TR_VARIANTS,
  th: ["thờ", "thở", "thợ", "thớ", "thò", "tho"],
  ph: ["phờ", "phở", "phợ", "phớ", "pho"],
  nh: ["nhờ", "nhở", "nhợ", "nhớ", "nho"],
  ng: ["ngờ", "ngở", "ngợ", "ngớ", "ngo"],
  kh: ["khờ", "khở", "khợ", "khớ", "kho"],
  gh: [
    "ghờ",
    "ghở",
    "ghợ",
    "ghớ",
    "gho",
    "gờ",
    "gở",
    "gợ",
    "gớ",
    "go",
    "g",
    "gh",
  ],
  gi: ["di", "dì", "dí", "dị", "dỉ", "dĩ", "gi", "j", "ji", "jì", "jí"],
  qu: ["quờ", "quở", "quợ", "quớ", "quo", "qu", "cùa", "của", "cua"],
};

export const PHONICS_DATA = [
  {
    id: "ch",
    text: "ch",
    color: "#EF4444",
    description: "Chữ Chờ",
    spoken: "chờ",
    accepts: VARIANTS_OF.ch,
    dino: {
      name: "Chompy",
      emoji: "🦖",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "con chó", emoji: "🐶" },
  },
  {
    id: "tr",
    text: "tr",
    color: "#3B82F6",
    description: "Chữ Trờ",
    spoken: "trờ",
    accepts: VARIANTS_OF.tr,
    dino: {
      name: "Trixie",
      emoji: "🦕",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "con trâu", emoji: "🐃" },
  },
  {
    id: "th",
    text: "th",
    color: "#22C55E",
    description: "Chữ Thờ",
    spoken: "thờ",
    accepts: VARIANTS_OF.th,
    dino: {
      name: "Thuto",
      emoji: "🦎",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "con thỏ", emoji: "🐰" },
  },
  {
    id: "ph",
    text: "ph",
    color: "#F59E0B",
    description: "Chữ Phờ",
    spoken: "phờ",
    accepts: VARIANTS_OF.ph,
    dino: {
      name: "Phoenix",
      emoji: "🦣",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "phở bò", emoji: "🍜" },
  },
  {
    id: "nh",
    text: "nh",
    color: "#EC4899",
    description: "Chữ Nhờ",
    spoken: "nhờ",
    accepts: VARIANTS_OF.nh,
    dino: {
      name: "Nhím",
      emoji: "🦔",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "ngôi nhà", emoji: "🏠" },
  },
  {
    id: "ng",
    text: "ng",
    color: "#8B5CF6",
    description: "Chữ Ngờ",
    spoken: "ngờ",
    accepts: VARIANTS_OF.ng,
    dino: {
      name: "Ngộ Nghĩnh",
      emoji: "🐊",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "con ngựa", emoji: "🐴" },
  },
  {
    id: "kh",
    text: "kh",
    color: "#10B981",
    description: "Chữ Khờ",
    spoken: "khờ",
    accepts: VARIANTS_OF.kh,
    dino: {
      name: "Khủng",
      emoji: "🐢",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "con khỉ", emoji: "🐵" },
  },
  {
    id: "gh",
    text: "gh",
    color: "#0EA5E9",
    description: "Chữ Ghờ",
    spoken: "ghờ",
    accepts: VARIANTS_OF.gh,
    dino: {
      name: "Ghẹo",
      emoji: "🦂",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "cái ghế", emoji: "🪑" },
  },
  {
    id: "gi",
    text: "gi",
    color: "#F43F5E",
    description: "Chữ Di",
    spoken: "di",
    accepts: VARIANTS_OF.gi,
    dino: {
      name: "Gióng",
      emoji: "🦏",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "đôi giày", emoji: "👟" },
  },
  {
    id: "qu",
    text: "qu",
    color: "#A855F7",
    description: "Chữ Quờ",
    spoken: "quờ",
    accepts: VARIANTS_OF.qu,
    dino: {
      name: "Quýt",
      emoji: "🦤",
      lottie:
        "https://lottie.host/4d04bb04-eef0-4be3-987c-77f9f5f60330/qWixmKtbDw.json",
    },
    example: { word: "quả quýt", emoji: "🍊" },
  },
];

export function getPhonicById(id) {
  return PHONICS_DATA.find((p) => p.id === id);
}
