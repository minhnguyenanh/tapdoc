import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import useMode, { MODES } from "@/hooks/useMode";

export default function PageHeader({ title, onBack, showModeSwitch = true }) {
  const { mode, setMode } = useMode();

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur z-20">
        <button onClick={onBack} className="p-2 text-amber-800">
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-2xl font-bold text-amber-800 text-center flex-1 truncate px-2">
          {title}
        </h2>
        {showModeSwitch ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setMode(MODES.LISTEN)}
              aria-label="Chế độ nghe"
              aria-pressed={mode === MODES.LISTEN}
              className={`p-2 text-2xl leading-none transition-colors ${
                mode === MODES.LISTEN ? "text-orange-500" : "text-gray-300"
              }`}
            >
              <i className="ri-volume-up-fill" />
            </button>
            <button
              onClick={() => setMode(MODES.SPEAK)}
              aria-label="Chế độ nói"
              aria-pressed={mode === MODES.SPEAK}
              className={`p-2 text-2xl leading-none transition-colors ${
                mode === MODES.SPEAK ? "text-orange-500" : "text-gray-300"
              }`}
            >
              <i className="ri-mic-fill" />
            </button>
          </div>
        ) : (
          <div className="w-12 flex-shrink-0" />
        )}
      </div>
      <div className="h-20 flex-shrink-0" />
    </>
  );
}
