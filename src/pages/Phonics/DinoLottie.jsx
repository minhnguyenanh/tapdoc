// Hiển thị khủng long bằng emoji. Tên file giữ "DinoLottie" để khỏi đổi import
// ở các nơi gọi; có thể đổi tên file sau khi cần dọn dẹp.
export default function DinoLottie({ fallbackEmoji = "🦖", size = 100 }) {
  return (
    <div
      className="flex items-center justify-center select-none"
      style={{ width: size, height: size, fontSize: size * 0.78 }}
    >
      {fallbackEmoji}
    </div>
  );
}
