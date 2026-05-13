import { motion } from "framer-motion";
import DinoLottie from "./DinoLottie";

const NODE_GAP = 180;
const HORIZONTAL_AMP = 90;
const TOP_PADDING = 60;
const BOTTOM_PADDING = 180;

const JUNGLE_PROPS = [
  { emoji: "🌴", top: "8%", left: "6%", size: 56, rotate: -8 },
  { emoji: "🌿", top: "14%", right: "8%", size: 42, rotate: 14 },
  { emoji: "🍃", top: "26%", left: "10%", size: 38, rotate: -20 },
  { emoji: "🌴", top: "36%", right: "5%", size: 60, rotate: 6 },
  { emoji: "🌿", top: "48%", left: "4%", size: 46, rotate: 18 },
  { emoji: "🪨", top: "58%", right: "12%", size: 44, rotate: 0 },
  { emoji: "🌴", top: "68%", left: "8%", size: 58, rotate: -10 },
  { emoji: "🌋", top: "78%", right: "10%", size: 50, rotate: 4 },
  { emoji: "🍃", top: "88%", left: "12%", size: 36, rotate: 22 },
];

function getNodePosition(i, width) {
  const y = TOP_PADDING + i * NODE_GAP;
  const centerX = width / 2;
  const dir = i % 2 === 0 ? -1 : 1;
  const x = centerX + dir * HORIZONTAL_AMP;
  return { x, y };
}

function buildPathD(total, width) {
  if (total === 0) return "";
  const first = getNodePosition(0, width);
  let d = `M ${first.x} ${first.y}`;
  for (let i = 1; i < total; i++) {
    const prev = getNodePosition(i - 1, width);
    const curr = getNodePosition(i, width);
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function TrailNode({ phonic, status, x, y, onPick, delay }) {
  const solved = status === "solved";
  const current = status === "current";
  const locked = status === "locked";

  const handleClick = () => {
    if (locked) return;
    onPick(phonic);
  };

  const ringColor = solved ? phonic.color : current ? phonic.color : "#9CA3AF";
  const pillBg = solved ? phonic.color : current ? phonic.color : "#9CA3AF";

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 240,
        damping: 16,
      }}
      whileHover={!locked ? { scale: 1.08, y: -4 } : {}}
      whileTap={!locked ? { scale: 0.92 } : {}}
      onClick={handleClick}
      disabled={locked}
      className={`absolute flex flex-col items-center gap-1 ${
        locked ? "cursor-not-allowed" : ""
      }`}
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={
        solved
          ? `${phonic.text} đã giải`
          : current
            ? `${phonic.text} chưa giải`
            : `${phonic.text} chưa mở`
      }
    >
      <div className="relative">
        <div
          className="rounded-full p-2 shadow-xl border-4 bg-white flex items-center justify-center"
          style={{
            width: 104,
            height: 104,
            borderColor: ringColor,
            opacity: locked ? 0.85 : 1,
          }}
        >
          {solved ? (
            <DinoLottie
              src={phonic.dino.lottie}
              fallbackEmoji={phonic.dino.emoji}
              size={84}
            />
          ) : (
            <div
              className="font-black select-none"
              style={{
                fontSize: 56,
                color: locked ? "#9CA3AF" : phonic.color,
                lineHeight: 1,
              }}
            >
              ?
            </div>
          )}
        </div>

        {/* Status badge */}
        {solved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-lg shadow-md border-2 border-white"
          >
            ✓
          </motion.div>
        )}
        {locked && (
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm shadow-md border-2 border-white">
            🔒
          </div>
        )}
        {current && (
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 0 0 rgba(34,197,94,0.6)",
                "0 0 0 14px rgba(34,197,94,0)",
                "0 0 0 0 rgba(34,197,94,0.6)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="absolute inset-0 rounded-full pointer-events-none"
          />
        )}
      </div>

      <div
        className="px-3 py-0.5 rounded-full text-white font-bold text-lg shadow-md leading-tight"
        style={{ backgroundColor: pillBg }}
      >
        {phonic.text}
      </div>
    </motion.button>
  );
}

export default function JungleTrail({
  phonics,
  onPick,
  solved,
  width = 360,
}) {
  const total = phonics.length;
  const height = TOP_PADDING + (total - 1) * NODE_GAP + BOTTOM_PADDING;
  const pathD = buildPathD(total, width);

  // The "current" node is the first non-solved one.
  const firstUnsolvedIdx = phonics.findIndex((p) => !solved.includes(p.id));

  // Compute progress for the trail line (how much to draw in color)
  const progressIdx = firstUnsolvedIdx === -1 ? total - 1 : firstUnsolvedIdx;

  return (
    <div className="relative mx-auto" style={{ width, height }}>
      {JUNGLE_PROPS.map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-70 select-none"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            fontSize: p.size,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      <svg
        width={width}
        height={height}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Base dashed trail */}
        <path
          d={pathD}
          fill="none"
          stroke="#92400E"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="2 18"
          opacity="0.35"
        />
        {/* Highlighted portion up to progressIdx */}
        {progressIdx > 0 && (
          <path
            d={buildPathD(progressIdx + 1, width)}
            fill="none"
            stroke="#16A34A"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="2 18"
            opacity="0.7"
          />
        )}
      </svg>

      {phonics.map((p, i) => {
        const { x, y } = getNodePosition(i, width);
        let status;
        if (solved.includes(p.id)) status = "solved";
        else if (i === firstUnsolvedIdx) status = "current";
        else status = "locked";

        return (
          <TrailNode
            key={p.id}
            phonic={p}
            status={status}
            x={x}
            y={y}
            delay={i * 0.06}
            onPick={onPick}
          />
        );
      })}
    </div>
  );
}
