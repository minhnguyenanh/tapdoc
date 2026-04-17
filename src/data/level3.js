// Phụ âm ghép phổ biến (3.1)
export const CONSONANT_GROUPS = [
  { letters: 'ch', phonetic: 'chờ', examples: ['chó', 'chạy', 'cháo', 'chú'] },
  { letters: 'nh', phonetic: 'nhờ', examples: ['nhà', 'nhỏ', 'nhớ', 'nhảy'] },
  { letters: 'ph', phonetic: 'phờ', examples: ['phở', 'phố', 'phá'] },
  { letters: 'th', phonetic: 'thờ', examples: ['thỏ', 'thơ', 'thầy'] },
  { letters: 'tr', phonetic: 'trờ', examples: ['trời', 'trẻ', 'trâu'] },
  { letters: 'kh', phonetic: 'khờ', examples: ['khỉ', 'khó', 'khoẻ'] },
]

// Nhóm đặc biệt (3.3)
export const SPECIAL_GROUPS = [
  { letters: 'qu', phonetic: 'quờ', examples: ['quả', 'quạt', 'quê', 'quà'], note: 'qu luôn đi chung' },
  { letters: 'gi', phonetic: 'gi', examples: ['gió', 'già', 'giày', 'giỏi'], note: 'gi có thể nhầm với d' },
]

// Quy tắc chính tả (3.2)
export const SPELLING_RULES = [
  {
    pair: ['g', 'gh'],
    rule: 'gh chỉ đi với e, ê, i',
    quiz: [
      { word: 'gà', answer: 'g', display: '_à' },
      { word: 'ghế', answer: 'gh', display: '_ế' },
      { word: 'gọi', answer: 'g', display: '_ọi' },
      { word: 'ghi', answer: 'gh', display: '_i' },
      { word: 'gỗ', answer: 'g', display: '_ỗ' },
      { word: 'ghẹ', answer: 'gh', display: '_ẹ' },
    ],
  },
  {
    pair: ['ng', 'ngh'],
    rule: 'ngh chỉ đi với e, ê, i',
    quiz: [
      { word: 'ngủ', answer: 'ng', display: '_ủ' },
      { word: 'nghỉ', answer: 'ngh', display: '_ỉ' },
      { word: 'ngồi', answer: 'ng', display: '_ồi' },
      { word: 'nghề', answer: 'ngh', display: '_ề' },
      { word: 'ngõ', answer: 'ng', display: '_õ' },
      { word: 'nghe', answer: 'ngh', display: '_e' },
    ],
  },
  {
    pair: ['c', 'k'],
    rule: 'k chỉ đi với e, ê, i',
    quiz: [
      { word: 'cá', answer: 'c', display: '_á' },
      { word: 'kẻ', answer: 'k', display: '_ẻ' },
      { word: 'cô', answer: 'c', display: '_ô' },
      { word: 'kí', answer: 'k', display: '_í' },
      { word: 'cua', answer: 'c', display: '_ua' },
      { word: 'kê', answer: 'k', display: '_ê' },
    ],
  },
]
