import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

const ROUTES = [
  {
    id: "alphabet",
    path: "/alphabet",
    title: "Bảng chữ cái",
    desc: "Nguyên âm, phụ âm, thanh điệu",
    color: "bg-green-500",
    textColor: "text-green-700",
    borderColor: "border-green-400",
    bgLight: "bg-green-50",
  },
  {
    id: "basic",
    path: "/basic",
    title: "Đánh vần cơ bản",
    desc: "Chương trình tiền tiểu học",
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-400",
    bgLight: "bg-yellow-50",
  },
  {
    id: "word",
    path: "/word",
    title: "Cấu tạo từ",
    desc: "Ghép vần, phụ âm ghép, vần đóng, vần phức tạp",
    color: "bg-purple-500",
    textColor: "text-purple-700",
    borderColor: "border-purple-400",
    bgLight: "bg-purple-50",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen p-6 pb-12">
      <button
        onClick={() => navigate("/settings")}
        aria-label="Cài đặt"
        className="fixed top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur shadow text-amber-800 z-20 hover:bg-white"
      >
        <Cog6ToothIcon className="w-8 h-8" />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center gap-2 mt-8 mb-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <BookOpenIcon className="w-16 h-16 text-amber-800" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold text-amber-800">
          Tập Đọc
        </h1>
        <p className="text-xl text-amber-700">Học chữ cùng bé</p>
      </div>

      {/* Danh sách route */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {ROUTES.map((route, i) => (
          <motion.button
            key={route.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(route.path)}
            className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${route.borderColor} ${route.bgLight} shadow-md hover:shadow-lg transition-shadow text-left`}
            disabled={i === 2}
          >
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-xl ${route.color} text-white flex items-center justify-center text-2xl font-bold shadow`}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-lg font-bold ${route.textColor}`}>
                {route.title}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">{route.desc}</div>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
