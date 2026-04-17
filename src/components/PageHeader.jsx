import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function PageHeader({ title, onBack }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/80 backdrop-blur z-20">
        <button onClick={onBack} className="p-2 text-amber-800">
          <ArrowLeftIcon className="w-8 h-8 text-amber-800" />
        </button>
        <h2 className="text-2xl font-bold text-amber-800 text-center flex-1 truncate px-2">
          {title}
        </h2>
        <div className="w-12 flex-shrink-0" />
      </div>
      <div className="h-20 flex-shrink-0" />
    </>
  )
}
