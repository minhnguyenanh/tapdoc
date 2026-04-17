# PLAN - Tập Đọc: 5 Cấp Độ Học Đánh Vần Tiếng Việt

## Tầm nhìn & Nguyên tắc thiết kế

**Đối tượng**: Trẻ 4-5 tuổi tự học đánh vần và phát âm tiếng Việt.

**Giá trị cốt lõi**: Làm quen mặt chữ → Chuẩn hóa phát âm giọng Bắc → Khơi gợi hứng thú học tập tự thân.

**Phương pháp**: Phonics (đánh vần theo âm) + Gamification — phản hồi Đúng/Sai ngay lập tức qua AI.

**Nguyên tắc UI**:
- **Minimalist**: Không hình ảnh minh họa, tập trung 100% vào mặt chữ
- **Hold-to-talk**: Nhấn giữ để nói — lọc tạp âm môi trường, tránh ghi nhận tiếng ồn khi trẻ chưa sẵn sàng
- **Font cực đại**: Sans-serif rõ ràng, kích thước 9xl → 15xl để trẻ dễ nhận diện

**Kỹ thuật giọng nói**:
- TTS: Ưu tiên giọng nữ miền Bắc chuẩn "Google Lê" (`rate: 0.8`) cho phát âm mẫu
- STT: Fuzzy matching khi so sánh transcript — bù đắp sai số tự nhiên khi trẻ nhỏ phát âm

**PWA**: Cấu hình Vite PWA để ứng dụng cài đặt trực tiếp lên màn hình chính (iPad/tablet).

---

## Tổng quan kiến trúc

```
Home (chọn cấp độ 1-5)
 ├── Cấp 1: Làm quen Chữ cái & Âm đơn
 │    ├── 1.1 Nguyên âm đơn (12 chữ, màu đỏ)
 │    ├── 1.2 Phụ âm đơn (17 chữ, màu xanh)  ← [ĐÃ CÓ: StepPicker + StepLearn]
 │    └── 1.3 Thanh điệu (6 dấu)
 ├── Cấp 2: Ghép vần xuôi (Phụ âm + Nguyên âm + Dấu)
 ├── Cấp 3: Phụ âm ghép & Quy tắc chính tả
 │    ├── 3.1 Phụ âm ghép phổ biến (ch, nh, ph, th, tr, kh)
 │    ├── 3.2 Phụ âm quy tắc (gh, ngh, k → chỉ đi với e, ê, i)
 │    └── 3.3 Nhóm đặc biệt (qu, gi)
 ├── Cấp 4: Vần đóng (có phụ âm cuối)
 │    ├── 4.1 Vần cuối n, m
 │    ├── 4.2 Vần cuối ng, nh
 │    └── 4.3 Vần cuối p, t, c, ch
 └── Cấp 5: Nguyên âm đôi & Vần phức tạp
      ├── 5.1 Nguyên âm đôi (ia, iê, ua, uô, ưa, ươ)
      ├── 5.2 Vần có âm đệm (oa, oe, uê, uy)
      └── 5.3 Vần siêu khó (oanh, uynh, uya, uyên)
```

**Stack**: React (Vite) + Tailwind CSS + Framer Motion | 100% Client-side | PWA

---

## Tài nguyên hiện có (đã code)

| File | Nội dung | Tái sử dụng |
|------|----------|-------------|
| `data/dictionary.js` | PHU_AM_DON/GHEP, NGUYEN_AM_DON/GHEP, PHONETIC_MAP, TONE_MAP, VALID_WORDS, splitWord, buildWord, checkValidWord | Dùng cho Cấp 1-3 |
| `data.json` | rhymes level 1-4, consonants initial/final | Dùng cho Cấp 4-5 |
| `hooks/useVoice.js` | speak, speakPhonetic, speakSlow, speakCongrats, speakRetry | Dùng cho tất cả cấp |
| `hooks/useListening.js` | Hold-to-talk STT, compare fuzzy | Dùng cho tất cả cấp |
| `components/WordCard.jsx` | Hiển thị từ lớn, tô màu phụ âm/nguyên âm, shake animation | Dùng cho Cấp 2+ |
| `components/Controls.jsx` | Nút Loa + Micro + Tiếp theo | Dùng cho tất cả cấp |
| `components/Confetti.jsx` | Pháo hoa khi đúng | Dùng cho tất cả cấp |
| `components/SyllableBuilder.jsx` | 3 cột: phụ âm / nguyên âm / dấu thanh | Dùng cho Cấp 2, cần mở rộng cho Cấp 4-5 |
| `App.jsx` | StepHome → StepPicker → StepLearn (flashcard chữ cái) | Refactor thành router |

---

## THIẾT KẾ CHI TIẾT TỪNG CẤP ĐỘ

---

### Cấp 1: Làm quen Chữ cái & Âm đơn

**Mục tiêu**: Nhận diện mặt chữ và phát âm đúng âm vị lẻ.

#### Flow UI

```
Cấp 1 → Chọn bài (1.1 / 1.2 / 1.3)
  ├── 1.1 Nguyên âm đơn
  │    └── Flashcard: hiển thị chữ (đỏ), nghe, bé đọc theo
  ├── 1.2 Phụ âm đơn
  │    └── Flashcard: hiển thị chữ (xanh), nghe "bờ/cờ/dờ...", bé đọc theo
  └── 1.3 Thanh điệu
       └── Flashcard: hiển thị ký hiệu dấu + ví dụ (ba/bà/bá/bả/bã/bạ)
```

#### 1.1 Nguyên âm đơn (12 chữ)
- Danh sách: `a, ă, â, e, ê, i, o, ô, ơ, u, ư, y`
- Hiển thị: chữ **cỡ cực đại** (`text-[12rem]`), **màu đỏ**
- Nghe: `speakPhonetic()` → phát âm đúng (a→"a", ă→"á", â→"ớ"...)
- Bé đọc: Hold-to-talk → so sánh với PHONETIC_MAP
- **Tái sử dụng**: StepLearn hiện tại (chỉ filter nguyên âm)

#### 1.2 Phụ âm đơn (17 chữ)
- Danh sách: `b, c, d, đ, g, h, k, l, m, n, p, q, r, s, t, v, x`
- Hiển thị: chữ cỡ cực đại, **màu xanh dương**
- Nghe: `speakPhonetic()` → "bờ", "cờ", "dờ"...
- **Tái sử dụng**: StepLearn hiện tại (chỉ filter phụ âm)
- **Lưu ý**: thêm `q` (hiện dictionary.js thiếu `q`, chỉ có `qu`)

#### 1.3 Thanh điệu (6 dấu)
- **Cần tạo mới** — flashcard đặc biệt cho dấu thanh
- Hiển thị: Tên dấu + Ký hiệu + Ví dụ cụ thể
  ```
  ┌─────────────────────────┐
  │     dấu sắc  ´          │
  │                          │
  │    ba  →  bá             │
  │                          │
  │     🔊  🎙️              │
  └─────────────────────────┘
  ```
- Mỗi card hiển thị:
  - Tên dấu (huyền, sắc, hỏi, ngã, nặng) — **màu tím**
  - Từ gốc "ba" → từ có dấu "bà" (cả 2 cỡ lớn)
  - Nghe phát âm cả cặp: "ba... bà"
- Dùng `DAU_THANH` từ dictionary.js (đã có sẵn example)

#### Component cần làm
- [ ] `LevelSelect.jsx` — Màn hình chọn cấp độ (1→5) thay StepHome
- [ ] `SubLevelSelect.jsx` — Chọn bài con (1.1, 1.2, 1.3)
- [ ] `ToneCard.jsx` — Flashcard dấu thanh (mới, cho bài 1.3)
- [ ] Refactor `StepLearn` → `FlashcardLearn.jsx` (tái sử dụng chung)

#### Dữ liệu
- Tất cả đã có trong `dictionary.js`: NGUYEN_AM_DON, PHU_AM_DON, DAU_THANH, PHONETIC_MAP

---

### Cấp 2: Ghép vần "Xuôi" (Cơ bản)

**Mục tiêu**: Bé hiểu quy tắc đọc từ trái sang phải, ghép phụ âm đơn + nguyên âm đơn + dấu thanh thành từ có nghĩa.

#### Flow UI

```
Cấp 2 → Chọn chế độ
  ├── Học theo danh sách (guided)
  │    └── Hiện từ có nghĩa → Phân tích cấu trúc → Nghe → Bé đọc
  └── Ghép tự do (sandbox)
       └── SyllableBuilder: chọn phụ âm + nguyên âm + dấu → kiểm tra
```

#### Chế độ 1: Học theo danh sách
- Lọc VALID_WORDS chỉ lấy từ **đơn giản** (phụ âm đơn + nguyên âm đơn):
  `ba, bà, bá, bố, mẹ, bé, cô, bò, cá, gà, dê, lá, cỏ, đỏ, to, đi, ăn, na, xe, bơi...`
- Flow mỗi từ:
  ```
  ┌──────────────────────────┐
  │   b  +  a  +  ◌̀  =  bà   │   ← Phân tích cấu trúc (animation tuần tự)
  │                            │
  │         bà                 │   ← WordCard cỡ lớn
  │                            │
  │    🔊  🎙️  ➡️            │
  └──────────────────────────┘
  ```
  1. Animation: Phụ âm (xanh) bay vào + Nguyên âm (đỏ) bay vào + Dấu (tím) rơi xuống → Ghép thành từ
  2. Tự động phát âm `speakSlow()`
  3. Bé nhấn 🔊 nghe lại hoặc nhấn giữ 🎙️ đọc theo
  4. Đúng → Confetti + speakCongrats → nút ➡️
  5. Sai → Shake + speakRetry → thử lại

#### Chế độ 2: Ghép tự do (Sandbox)
- **Tái sử dụng** `SyllableBuilder.jsx` (đã có sẵn)
- Giới hạn: chỉ hiện PHU_AM_DON + NGUYEN_AM_DON + DAU_THANH
- Ghép xong → nếu từ có nghĩa → chuyển sang WordCard + nghe + đọc
- Nếu vô nghĩa → Shake + "Từ này chưa có nghĩa, thử lại nào!"

#### Component cần làm
- [ ] `SpellingAnimation.jsx` — Animation phân tích cấu trúc (phụ âm + nguyên âm + dấu bay vào ghép)
- [ ] `GuidedLearn.jsx` — Màn học theo danh sách (dùng WordCard + Controls + SpellingAnimation)
- [ ] `SandboxMode.jsx` — Wrapper cho SyllableBuilder + WordCard

#### Dữ liệu cần bổ sung
- [ ] Hàm `getLevel2Words()` — lọc VALID_WORDS chỉ lấy từ có cấu trúc phụ âm đơn + nguyên âm đơn

---

### Cấp 3: Phụ âm ghép & Quy tắc chính tả

**Mục tiêu**: Bé nhận diện cụm 2-3 chữ cái là một đơn vị âm thanh duy nhất, học quy tắc chính tả đặc biệt.

#### Flow UI

```
Cấp 3 → Chọn bài (3.1 / 3.2 / 3.3)
  ├── 3.1 Phụ âm ghép phổ biến
  │    └── Flashcard: ch→"chờ", nh→"nhờ"... + ví dụ từ
  ├── 3.2 Phụ âm quy tắc (gh, ngh, k)
  │    └── Bài học tương tác: quy tắc + bài tập
  └── 3.3 Nhóm đặc biệt (qu, gi)
       └── Flashcard + ví dụ
```

#### 3.1 Phụ âm ghép phổ biến (6 cụm)
- Danh sách: `ch, nh, ph, th, tr, kh`
- Flashcard 2 phần:
  ```
  ┌──────────────────────────┐
  │         ch                │   ← Cụm chữ cỡ lớn, màu xanh
  │       "chờ"               │   ← Phiên âm
  │                           │
  │   chó  chạy  cháo         │   ← 3 ví dụ từ (nhỏ hơn)
  │                           │
  │     🔊  🎙️  ▶️           │
  └──────────────────────────┘
  ```
- Nghe: phát âm "chờ" + đọc ví dụ "chó"
- Bé đọc lại phụ âm ghép hoặc từ ví dụ

#### 3.2 Phụ âm quy tắc — gh, ngh, k
- **Quy tắc cốt lõi**: gh, ngh, k chỉ đi với **e, ê, i** (ghế, nghỉ, kẻ)
- UI bài học tương tác:
  ```
  ┌──────────────────────────┐
  │  g → gà, gỗ, gọi        │   ← g đi với a, ô, o...
  │  gh → ghế, ghẹ, ghi      │   ← gh chỉ đi với e, ê, i
  │                           │
  │  Quiz: "gà" dùng g hay gh?│
  │    [ g ]    [ gh ]        │   ← Bé chọn đáp án
  └──────────────────────────┘
  ```
- Tương tự cho ng/ngh và c/k
- Component quiz đơn giản: hiện từ, bé chọn đúng phụ âm

#### 3.3 Nhóm đặc biệt — qu, gi
- `qu` = "quờ", luôn đi chung (quả, quạt, quê)
- `gi` = "gi/dờ", có thể nhầm với "d" (gió, già, giày)
- Flashcard + ví dụ tương tự 3.1

#### Component cần làm
- [ ] `ConsonantGroupCard.jsx` — Flashcard phụ âm ghép (chữ lớn + ví dụ từ)
- [ ] `SpellingRuleQuiz.jsx` — Quiz chọn đúng phụ âm (g/gh, ng/ngh, c/k)
- [ ] `Level3Learn.jsx` — Điều phối 3 bài con

#### Dữ liệu cần bổ sung
- [ ] Trong `dictionary.js` hoặc file mới `data/level3.js`:
  ```js
  CONSONANT_GROUPS = {
    common: ['ch', 'nh', 'ph', 'th', 'tr', 'kh'],
    rules: [
      { pair: ['g', 'gh'], rule: 'gh chỉ đi với e, ê, i', examples: {...} },
      { pair: ['ng', 'ngh'], rule: 'ngh chỉ đi với e, ê, i', examples: {...} },
      { pair: ['c', 'k'], rule: 'k chỉ đi với e, ê, i', examples: {...} },
    ],
    special: ['qu', 'gi'],
  }
  ```
- [ ] Quiz questions cho phần quy tắc

---

### Cấp 4: Vần có Phụ âm cuối (Vần đóng)

**Mục tiêu**: Bé biết cách kết thúc một âm tiết bằng các phụ âm chặn.

#### Cấu trúc âm tiết mở rộng
```
Phụ âm đầu + Vần (nguyên âm + phụ âm cuối) + Dấu thanh
    b       +  an                              +  ◌̀   = bàn
    ch      +  áo   (vần mở)                          = cháo → Cấp 2
    s       +  ông  (vần đóng)                         = sông → Cấp 4 ★
```

#### Flow UI

```
Cấp 4 → Chọn bài (4.1 / 4.2 / 4.3)
  ├── 4.1 Vần cuối n, m
  │    └── an, am, en, em, ăn, ăm, ân, âm, in, im, on, om, ôn, ôm, ơn, un, ưn...
  ├── 4.2 Vần cuối ng, nh
  │    └── ang, anh, ong, ông, inh, ung, ưng, ênh...
  └── 4.3 Vần cuối p, t, c, ch
       └── ap, at, ac, ach, ăp, ăt, ât, ep, et, ip, it, ich, op, ot, oc, ôt, ôc, ut, uc...
```

#### Mỗi bài con (ví dụ 4.1: Vần cuối n, m)

**Bước 1 — Giới thiệu vần** (Flashcard):
```
┌──────────────────────────┐
│          an               │   ← Vần cỡ lớn, màu cam
│   a (đỏ) + n (xanh)      │   ← Phân tích thành phần
│                           │
│  bàn  nàn  an             │   ← Ví dụ từ
│     🔊  🎙️  ▶️          │
└──────────────────────────┘
```

**Bước 2 — Ghép từ với vần** (SyllableBuilder mở rộng):
```
┌──────────────────────────┐
│  [Phụ âm đầu]  +  [Vần]  +  [Dấu]  │
│    b  c  d ...     an am     ◌̀ ◌́ ...│
│                                       │
│           bàn                         │
│     🔊  🎙️  ✅                      │
└──────────────────────────┘
```

- Cột 2 thay vì nguyên âm đơn → hiện **danh sách vần** của bài (an, am, en, em...)
- Ghép: phụ âm đầu + vần + dấu thanh → kiểm tra có nghĩa không

**Bước 3 — Luyện đọc từ** (GuidedLearn):
- Hiện từ có nghĩa chứa vần đang học (bàn, ghế → vần an/e)
- Flow: Nghe → Đọc → Đúng/Sai

#### Component cần làm
- [ ] `RhymeCard.jsx` — Flashcard giới thiệu vần (vần lớn + phân tích + ví dụ)
- [ ] Mở rộng `SyllableBuilder.jsx` — cột 2 chuyển sang chọn vần thay vì nguyên âm đơn
- [ ] `Level4Learn.jsx` — Điều phối 3 bài con + 3 bước mỗi bài

#### Dữ liệu
- Nguồn chính: `data.json` → `rhymes.level_2` (đã có sẵn 60+ vần)
- [ ] Cần bổ sung: mapping vần → danh sách từ ví dụ có nghĩa
  ```js
  RHYME_EXAMPLES = {
    'an': ['bàn', 'nàn', 'an', 'man', 'can'],
    'am': ['tám', 'cam', 'lam', 'đàm'],
    'ang': ['vàng', 'mang', 'sang', 'nắng'],
    ...
  }
  ```
- [ ] Hàm `getRhymeWords(rhyme)` → trả về các từ có nghĩa chứa vần đó
- [ ] Phân nhóm vần theo phụ âm cuối: `groupRhymesByFinal()`

---

### Cấp 5: Nguyên âm đôi & Vần phức tạp

**Mục tiêu**: Đọc được mọi cấu trúc âm tiết, kể cả từ dài và khó phát âm nhất.

#### Flow UI

```
Cấp 5 → Chọn bài (5.1 / 5.2 / 5.3)
  ├── 5.1 Nguyên âm đôi
  │    └── ia, iê, ua, uô, ưa, ươ  (kiến, suối, hươu)
  ├── 5.2 Vần có âm đệm
  │    └── oa, oe, uê, uy  (hoa, khoe, thuế)
  └── 5.3 Vần siêu khó
       └── oanh, uynh, uya, uyên  (doanh, phụ huynh)
```

#### 5.1 Nguyên âm đôi (6 cặp)
- Danh sách: `ia, iê, ua, uô, ưa, ươ`
- Flashcard đặc biệt: hiện 2 nguyên âm gốc → kết hợp
  ```
  ┌──────────────────────────┐
  │    i  +  a  →  ia        │   ← Animation kết hợp
  │                           │
  │  bia  kia  mía  tia      │   ← Ví dụ
  │     🔊  🎙️  ▶️          │
  └──────────────────────────┘
  ```
- Nguồn: `data.json` → `vowels.double_variants`
- Sau giới thiệu → Luyện đọc từ chứa nguyên âm đôi

#### 5.2 Vần có âm đệm (oa, oe, uê, uy)
- Giải thích: âm đệm là âm "nối" giữa phụ âm đầu và nguyên âm chính
  ```
  h + oa → hoa    (o là âm đệm)
  kh + oe → khoe  (o là âm đệm)
  th + uê → thuế  (u là âm đệm)
  ```
- Flashcard + ghép từ tương tự Cấp 4
- Nguồn: `data.json` → `rhymes.level_4` (oa, oe, uê, uy...)

#### 5.3 Vần siêu khó
- Danh sách: `oanh, uynh, uya, uyên, oai, oang, uât...`
- Cấu trúc đầy đủ: phụ âm đầu + âm đệm + nguyên âm chính + phụ âm cuối + dấu thanh
  ```
  d + oanh → doanh
  h + uynh → huynh (phụ huynh)
  t + uyên → tuyên (tuyên bố)
  ```
- Flow: Giới thiệu vần → Phân tích cấu trúc (animation) → Luyện đọc
- Nguồn: `data.json` → `rhymes.level_4` phần cuối

#### Component cần làm
- [ ] `DiphthongCard.jsx` — Flashcard nguyên âm đôi (animation kết hợp 2 nguyên âm)
- [ ] `GlideCard.jsx` — Flashcard âm đệm (hiện rõ vai trò âm đệm trong từ)
- [ ] `ComplexSpelling.jsx` — Phân tích cấu trúc đầy đủ 5 thành phần (phụ âm đầu + âm đệm + nguyên âm + phụ âm cuối + dấu)
- [ ] `Level5Learn.jsx` — Điều phối 3 bài con

#### Dữ liệu
- Nguồn: `data.json` → `rhymes.level_3` (nguyên âm đôi) + `rhymes.level_4` (âm đệm + vần khó)
- [ ] Cần bổ sung: mapping vần phức → từ ví dụ
- [ ] Hàm `splitComplexSyllable(word)` — tách âm tiết phức tạp thành 5 thành phần:
  ```js
  splitComplexSyllable('doanh')
  // → { phuAmDau: 'd', amDem: 'o', nguyenAm: 'a', phuAmCuoi: 'nh', dauThanh: 'ngang' }
  ```

---

## THIẾT KẾ CHUNG

### Cấu trúc thư mục mới

```
src/
├── components/
│   ├── FlashcardLearn.jsx      ← Refactor từ StepLearn (dùng chung Cấp 1-5)
│   ├── ToneCard.jsx            ← Flashcard dấu thanh (Cấp 1.3)
│   ├── SpellingAnimation.jsx   ← Animation ghép vần (Cấp 2+)
│   ├── ConsonantGroupCard.jsx  ← Flashcard phụ âm ghép (Cấp 3)
│   ├── SpellingRuleQuiz.jsx    ← Quiz quy tắc chính tả (Cấp 3.2)
│   ├── RhymeCard.jsx           ← Flashcard giới thiệu vần (Cấp 4-5)
│   ├── DiphthongCard.jsx       ← Flashcard nguyên âm đôi (Cấp 5.1)
│   ├── WordCard.jsx            ← [GIỮ NGUYÊN]
│   ├── Controls.jsx            ← [GIỮ NGUYÊN]
│   ├── Confetti.jsx            ← [GIỮ NGUYÊN]
│   └── SyllableBuilder.jsx     ← [MỞ RỘNG] thêm mode vần
├── pages/
│   ├── Home.jsx                ← Chọn cấp độ (thay StepHome)
│   ├── LevelSelect.jsx         ← Chọn bài con trong mỗi cấp
│   ├── Level1.jsx              ← Điều phối Cấp 1 (1.1, 1.2, 1.3)
│   ├── Level2.jsx              ← Điều phối Cấp 2 (guided + sandbox)
│   ├── Level3.jsx              ← Điều phối Cấp 3 (3.1, 3.2, 3.3)
│   ├── Level4.jsx              ← Điều phối Cấp 4 (4.1, 4.2, 4.3)
│   └── Level5.jsx              ← Điều phối Cấp 5 (5.1, 5.2, 5.3)
├── data/
│   ├── dictionary.js           ← [MỞ RỘNG] thêm hàm mới
│   ├── data.json               ← [GIỮ NGUYÊN]
│   ├── level3.js               ← [MỚI] dữ liệu phụ âm ghép + quiz
│   └── rhymeExamples.js        ← [MỚI] mapping vần → từ ví dụ
├── hooks/
│   ├── useVoice.js             ← [GIỮ NGUYÊN]
│   ├── useListening.js         ← [GIỮ NGUYÊN]
│   └── useProgress.js          ← [MỚI] lưu tiến độ localStorage
└── App.jsx                     ← [REFACTOR] router điều phối tất cả
```

### Hệ thống tiến độ (useProgress)

```js
// localStorage structure
{
  "tapdoc_progress": {
    "level1": { "1.1": { completed: ["a","ă","â"...], total: 12 },
                "1.2": { completed: [...], total: 17 },
                "1.3": { completed: [...], total: 6 } },
    "level2": { "guided": { completed: ["ba","bà"...], total: 30 },
                "sandbox": { wordsBuilt: ["bé","cá"...] } },
    "level3": { "3.1": {...}, "3.2": { quizScore: 8, total: 10 }, "3.3": {...} },
    "level4": { "4.1": {...}, "4.2": {...}, "4.3": {...} },
    "level5": { "5.1": {...}, "5.2": {...}, "5.3": {...} },
    "lastLevel": "level2",
    "lastDate": "2026-04-17"
  }
}
```

### Màn hình Home mới

```
┌──────────────────────────────────────┐
│            📖 Tập Đọc                │
│        Học đánh vần cùng bé          │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  ★ Cấp 1: Chữ cái & Âm đơn   │  │  ← Xanh lá, unlocked
│  │  ████████░░ 80%                │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  ★ Cấp 2: Ghép vần xuôi      │  │  ← Vàng, unlocked khi Cấp 1 ≥ 50%
│  │  ███░░░░░░░ 30%               │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  🔒 Cấp 3: Phụ âm ghép       │  │  ← Xám, locked
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  🔒 Cấp 4: Vần đóng          │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │  🔒 Cấp 5: Vần phức tạp      │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- Mỗi cấp có progress bar
- Unlock cấp tiếp theo khi cấp trước đạt ≥ 50%
- Cấp 1 luôn mở

### Quy tắc UI chung cho tất cả cấp

| Yếu tố | Quy tắc |
|---------|---------|
| Nguyên âm | **Màu đỏ** (`text-red-500`) |
| Phụ âm | **Màu xanh dương** (`text-blue-500`) |
| Dấu thanh | **Màu tím** (`text-purple-500`) |
| Vần (nguyên âm + phụ âm cuối) | **Màu cam** (`text-orange-500`) |
| Âm đệm | **Màu xanh lá** (`text-green-500`) |
| Font chữ lớn | `text-[10rem]` → `text-[16rem]` |
| Nút bấm | Tối thiểu 48×48px, rounded-2xl |
| Đúng | Confetti + speakCongrats |
| Sai | Shake + speakRetry |
| Chuyển card | Swipe hoặc nút ◀️ ▶️ |

---

## THỨ TỰ THỰC HIỆN

| # | Task | Files | Độ phức tạp |
|---|------|-------|-------------|
| 1 | Refactor App.jsx: router + Home chọn cấp độ | App.jsx, pages/Home.jsx | Trung bình |
| 2 | Cấp 1.1 + 1.2: Refactor StepLearn → FlashcardLearn | components/FlashcardLearn.jsx, pages/Level1.jsx | Thấp (refactor) |
| 3 | Cấp 1.3: ToneCard cho thanh điệu | components/ToneCard.jsx | Thấp |
| 4 | useProgress: lưu tiến độ localStorage | hooks/useProgress.js | Thấp |
| 5 | Cấp 2 Guided: SpellingAnimation + GuidedLearn | components/SpellingAnimation.jsx, pages/Level2.jsx | Trung bình |
| 6 | Cấp 2 Sandbox: SyllableBuilder (đã có) + wrapper | pages/Level2.jsx | Thấp |
| 7 | Cấp 3: Dữ liệu phụ âm ghép + ConsonantGroupCard | data/level3.js, components/ConsonantGroupCard.jsx | Trung bình |
| 8 | Cấp 3.2: SpellingRuleQuiz | components/SpellingRuleQuiz.jsx | Trung bình |
| 9 | Cấp 4: RhymeCard + mở rộng SyllableBuilder | data/rhymeExamples.js, components/RhymeCard.jsx | Cao |
| 10 | Cấp 5: DiphthongCard + ComplexSpelling | components/DiphthongCard.jsx, pages/Level5.jsx | Cao |
| 11 | Polish: animation, responsive, PWA | Toàn bộ | Trung bình |
