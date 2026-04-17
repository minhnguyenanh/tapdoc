// Phụ âm đơn
export const PHU_AM_DON = [
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x',
]

// Phụ âm ghép
export const PHU_AM_GHEP = [
  'ch', 'gh', 'gi', 'kh', 'ng', 'ngh', 'nh', 'ph', 'qu', 'th', 'tr',
]

export const PHU_AM = [...PHU_AM_DON, ...PHU_AM_GHEP]

// Nguyên âm đơn
export const NGUYEN_AM_DON = [
  'a', 'ă', 'â', 'e', 'ê', 'i', 'o', 'ô', 'ơ', 'u', 'ư', 'y',
]

// Nguyên âm ghép
export const NGUYEN_AM_GHEP = [
  'ai', 'ao', 'au', 'âu', 'ay', 'ây',
  'eo', 'êu',
  'ia', 'iê', 'iu',
  'oa', 'oă', 'oe', 'oi', 'ôi', 'ơi', 'oo', 'ou',
  'ua', 'uâ', 'uê', 'ui', 'ưa', 'ưi', 'ưu', 'ươ',
]

export const NGUYEN_AM = [...NGUYEN_AM_DON, ...NGUYEN_AM_GHEP]

// Bảng phiên âm chữ cái tiếng Việt (cách đọc âm)
export const PHONETIC_MAP = {
  // Phụ âm đơn
  'b': 'bờ',
  'c': 'cờ',
  'd': 'dờ',
  'đ': 'đờ',
  'g': 'gờ',
  'h': 'hờ',
  'k': 'ca',
  'l': 'lờ',
  'm': 'mờ',
  'n': 'nờ',
  'p': 'pờ',
  'q': 'cu',
  'r': 'rờ',
  's': 'sờ',
  't': 'tờ',
  'v': 'vờ',
  'x': 'xờ',
  // Phụ âm ghép
  'ch': 'chờ',
  'gh': 'gờ',
  'gi': 'gi',
  'kh': 'khờ',
  'ng': 'ngờ',
  'ngh': 'ngờ',
  'nh': 'nhờ',
  'ph': 'phờ',
  'qu': 'quờ',
  'th': 'thờ',
  'tr': 'trờ',
  // Nguyên âm đơn
  'a': 'a',
  'ă': 'á',
  'â': 'ớ',
  'e': 'e',
  'ê': 'ê',
  'i': 'i',
  'o': 'o',
  'ô': 'ô',
  'ơ': 'ơ',
  'u': 'u',
  'ư': 'ư',
  'y': 'y',
  // Nguyên âm ghép
  'ai': 'ai',
  'ao': 'ao',
  'au': 'au',
  'âu': 'âu',
  'ay': 'ay',
  'ây': 'ây',
  'eo': 'eo',
  'êu': 'êu',
  'ia': 'ia',
  'iê': 'iê',
  'iu': 'iu',
  'oa': 'oa',
  'oă': 'oă',
  'oe': 'oe',
  'oi': 'oi',
  'ôi': 'ôi',
  'ơi': 'ơi',
  'oo': 'oo',
  'ou': 'ou',
  'ua': 'ua',
  'uâ': 'uâ',
  'uê': 'uê',
  'ui': 'ui',
  'ưa': 'ưa',
  'ưi': 'ưi',
  'ưu': 'ưu',
  'ươ': 'ươ',
}

/**
 * Lấy phiên âm đúng cho chữ cái / tổ hợp chữ
 * getPhonetic('b') => 'bờ'
 * getPhonetic('ă') => 'á'
 */
export function getPhonetic(letter) {
  return PHONETIC_MAP[letter.toLowerCase()] || letter
}

// Dấu thanh
export const DAU_THANH = [
  { name: 'ngang', mark: '', example: 'ba' },
  { name: 'huyền', mark: '\u0300', example: 'bà' },
  { name: 'sắc', mark: '\u0301', example: 'bá' },
  { name: 'hỏi', mark: '\u0309', example: 'bả' },
  { name: 'ngã', mark: '\u0303', example: 'bã' },
  { name: 'nặng', mark: '\u0323', example: 'bạ' },
]

// Bản đồ thêm dấu thanh vào nguyên âm
const TONE_MAP = {
  'a':  { ngang: 'a',  huyền: 'à',  sắc: 'á',  hỏi: 'ả',  ngã: 'ã',  nặng: 'ạ' },
  'ă':  { ngang: 'ă',  huyền: 'ằ',  sắc: 'ắ',  hỏi: 'ẳ',  ngã: 'ẵ',  nặng: 'ặ' },
  'â':  { ngang: 'â',  huyền: 'ầ',  sắc: 'ấ',  hỏi: 'ẩ',  ngã: 'ẫ',  nặng: 'ậ' },
  'e':  { ngang: 'e',  huyền: 'è',  sắc: 'é',  hỏi: 'ẻ',  ngã: 'ẽ',  nặng: 'ẹ' },
  'ê':  { ngang: 'ê',  huyền: 'ề',  sắc: 'ế',  hỏi: 'ể',  ngã: 'ễ',  nặng: 'ệ' },
  'i':  { ngang: 'i',  huyền: 'ì',  sắc: 'í',  hỏi: 'ỉ',  ngã: 'ĩ',  nặng: 'ị' },
  'o':  { ngang: 'o',  huyền: 'ò',  sắc: 'ó',  hỏi: 'ỏ',  ngã: 'õ',  nặng: 'ọ' },
  'ô':  { ngang: 'ô',  huyền: 'ồ',  sắc: 'ố',  hỏi: 'ổ',  ngã: 'ỗ',  nặng: 'ộ' },
  'ơ':  { ngang: 'ơ',  huyền: 'ờ',  sắc: 'ớ',  hỏi: 'ở',  ngã: 'ỡ',  nặng: 'ợ' },
  'u':  { ngang: 'u',  huyền: 'ù',  sắc: 'ú',  hỏi: 'ủ',  ngã: 'ũ',  nặng: 'ụ' },
  'ư':  { ngang: 'ư',  huyền: 'ừ',  sắc: 'ứ',  hỏi: 'ử',  ngã: 'ữ',  nặng: 'ự' },
  'y':  { ngang: 'y',  huyền: 'ỳ',  sắc: 'ý',  hỏi: 'ỷ',  ngã: 'ỹ',  nặng: 'ỵ' },
}

// Danh sách từ có nghĩa (~80 từ phổ biến cho trẻ)
export const VALID_WORDS = [
  // Gia đình
  'ba', 'bà', 'bá', 'bố', 'mẹ', 'mệ', 'bé', 'cô', 'cậu', 'chú', 'dì', 'ông',
  // Động vật
  'bò', 'bó', 'cá', 'gà', 'vịt', 'chó', 'mèo', 'dê', 'khỉ', 'thỏ', 'cò',
  'rùa', 'voi', 'nai', 'cọp', 'sâu', 'ốc', 'cua', 'tôm',
  // Thiên nhiên
  'hoa', 'lá', 'cây', 'cỏ', 'mây', 'gió', 'mưa', 'sao', 'trời',
  'nắng', 'đất', 'nước', 'sông', 'biển',
  // Đồ vật
  'bàn', 'ghế', 'xe', 'bút', 'sách', 'áo', 'nón', 'giày',
  // Thức ăn
  'cơm', 'phở', 'bánh', 'sữa', 'cháo', 'quả', 'cam', 'na', 'ổi', 'dưa',
  // Màu sắc
  'đỏ', 'xanh',
  // Hành động / Tính từ
  'đi', 'chạy', 'bay', 'bơi', 'ăn', 'ngủ', 'to', 'nhỏ',
  // Số đếm
  'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười',
]

// Set để tra cứu nhanh
const VALID_WORDS_SET = new Set(VALID_WORDS.map(w => w.toLowerCase()))

/**
 * Thêm dấu thanh vào nguyên âm chính
 * applyTone('a', 'sắc') => 'á'
 */
export function applyTone(vowel, toneName) {
  if (!toneName || toneName === 'ngang') return vowel

  // Tìm nguyên âm chính để thêm dấu (nguyên âm cuối cùng trong chuỗi)
  const chars = [...vowel]
  // Với nguyên âm ghép, dấu đặt ở nguyên âm chính theo quy tắc:
  // - Nếu có 2 nguyên âm: dấu ở nguyên âm đầu nếu từ kết thúc bằng nguyên âm ghép,
  //   dấu ở nguyên âm sau nếu có phụ âm cuối
  // Đơn giản hóa: đặt dấu ở nguyên âm base tìm được trong TONE_MAP
  for (let i = chars.length - 1; i >= 0; i--) {
    const base = chars[i].toLowerCase()
    if (TONE_MAP[base] && TONE_MAP[base][toneName]) {
      chars[i] = TONE_MAP[base][toneName]
      return chars.join('')
    }
  }
  return vowel
}

/**
 * Ghép phụ âm + nguyên âm + dấu thanh thành từ
 * buildWord('b', 'a', 'sắc') => 'bá'
 */
export function buildWord(phuAm, nguyenAm, dauThanh = 'ngang') {
  const vowelWithTone = applyTone(nguyenAm, dauThanh)
  return `${phuAm}${vowelWithTone}`
}

/**
 * Kiểm tra từ ghép có nghĩa không
 */
export function checkValidWord(phuAm, nguyenAm, dauThanh = 'ngang') {
  const word = buildWord(phuAm, nguyenAm, dauThanh).toLowerCase()
  return VALID_WORDS_SET.has(word)
}

/**
 * Kiểm tra một chuỗi có phải từ hợp lệ không
 */
export function isValidWord(word) {
  return VALID_WORDS_SET.has(word.toLowerCase().trim())
}

/**
 * Lấy từ ngẫu nhiên
 */
export function getRandomWord() {
  const uniqueWords = [...new Set(VALID_WORDS)]
  return uniqueWords[Math.floor(Math.random() * uniqueWords.length)]
}

/**
 * Tách từ thành { phuAm, nguyenAm, dauThanh }
 */
export function splitWord(word) {
  const normalized = word.toLowerCase().trim()

  // Tìm phụ âm đầu (thử ghép trước, rồi đơn)
  let phuAm = ''
  const sortedPhuAm = [...PHU_AM].sort((a, b) => b.length - a.length)
  for (const pa of sortedPhuAm) {
    if (normalized.startsWith(pa)) {
      phuAm = pa
      break
    }
  }

  const rest = normalized.slice(phuAm.length)

  // Xác định dấu thanh từ ký tự có dấu
  let dauThanh = 'ngang'
  let nguyenAm = rest

  for (const [baseVowel, tones] of Object.entries(TONE_MAP)) {
    for (const [tone, charWithTone] of Object.entries(tones)) {
      if (tone === 'ngang') continue
      if (rest.includes(charWithTone)) {
        dauThanh = tone
        nguyenAm = rest.replace(charWithTone, baseVowel)
        break
      }
    }
    if (dauThanh !== 'ngang') break
  }

  return { phuAm, nguyenAm, dauThanh }
}

/**
 * Lấy danh sách từ Cấp 2 (phụ âm đơn + nguyên âm đơn + dấu thanh)
 * Lọc VALID_WORDS chỉ lấy từ có cấu trúc đơn giản
 */
export function getLevel2Words() {
  const phuAmDonSet = new Set(PHU_AM_DON)
  const nguyenAmDonSet = new Set(NGUYEN_AM_DON)

  return VALID_WORDS.filter((word) => {
    const { phuAm, nguyenAm } = splitWord(word)
    // Phụ âm đầu phải là phụ âm đơn hoặc rỗng
    if (phuAm && !phuAmDonSet.has(phuAm)) return false
    // Nguyên âm phải là nguyên âm đơn
    if (!nguyenAmDonSet.has(nguyenAm)) return false
    return true
  })
}

/**
 * Phân loại ký tự: consonant / vowel
 */
export function classifyChar(char) {
  const lower = char.toLowerCase()
  // Kiểm tra nếu ký tự gốc (bỏ dấu) là nguyên âm
  const baseVowels = 'aăâeêioôơuưy'
  for (const v of baseVowels) {
    if (lower === v) return 'vowel'
    if (TONE_MAP[v]) {
      for (const toned of Object.values(TONE_MAP[v])) {
        if (lower === toned) return 'vowel'
      }
    }
  }
  return 'consonant'
}
