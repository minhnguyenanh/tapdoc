Thiết kế thêm 1 route: game

- Mục tiêu:Giúp trẻ nhận diện mặt chữ, cách phát âm và cách sử dụng các phụ âm ghép (ch, tr, th, ph, nh, ng...) trong từ vựng cụ thể.
  tham khảo rtk cat src/data/phonics.js
- Cấu trúc vòng lặp trò chơi (The Game Loop)
  Trò chơi vận hành theo một quy trình khép kín, tối giản hóa thao tác để trẻ có thể tự chơi:

Mở đầu (Intro): Giới thiệu âm ghép mục tiêu bằng hình ảnh lớn và âm thanh sống động (Ví dụ: Chữ CH hiện ra, máy đọc "Chờ").

Học tập (Learning): Hiển thị thẻ từ vựng (Hình ảnh + Chữ). Máy tự động phát âm mẫu chuẩn.

Thử thách (Challenge): Hệ thống mở Micro (có hiệu ứng vòng sóng để báo hiệu). Trẻ nhìn hình và chữ để đọc to.

Phản hồi (Feedback): AI phân tích giọng đọc ngay lập tức.

Đúng: Khen ngợi, thưởng sao, bắn pháo hoa và tự động chuyển từ.

Sai: Khuyến khích đọc lại nhẹ nhàng kèm gợi ý âm thanh.

3. Các đặc điểm kỹ thuật nổi bật
   Công nghệ "Tai nghe AI" (ASR): Sử dụng sức mạnh của trình duyệt để lắng nghe tiếng Việt. Hệ thống được cấu hình để "bao dung" với giọng nói chưa tròn vành rõ chữ của trẻ nhỏ.

Thiết kế "Touch-First": Các nút bấm to, màu sắc rực rỡ, không có các menu phức tạp. Trẻ chỉ cần Chạm và Nói.

Phản hồi thị giác (Visual Feedback): Sử dụng các hiệu ứng chuyển động mạnh mẽ (Framer Motion) để giữ chân trẻ: thẻ bài nhún nhảy, ngôi sao bay lượn, pháo hoa nổ.

4. Giao diện người dùng (UI Style)
   Giao diện được định hướng theo phong cách Playful & Friendly:

Màu sắc: Mỗi phụ âm ghép sẽ có một "vùng đất" màu sắc riêng (Xanh dương cho tr, Hồng cho nh, Đỏ cho ch...).

Bố cục: Tập trung vào một đối tượng duy nhất tại trung tâm màn hình để trẻ không bị xao nhãng.

Thành tích: Một thanh tiến trình dạng con đường mòn phía trên giúp trẻ biết mình còn bao nhiêu "cửa ải" nữa để hoàn thành.
