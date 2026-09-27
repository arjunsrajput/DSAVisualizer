export default function StackVisualizer({ stack, array, highlight, step, capacity }) {
  const items = stack || array || []
  const activeHighlight = highlight ?? step?.highlight ?? -1
  const empty = Math.max(0, capacity - items.length)

  return (
    <div className="panel p-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Stack (top → bottom)</div>
      <div className="flex flex-col items-center gap-1 min-h-64">
        {/* Empty slots */}
        {Array(empty).fill(null).map((_, i) => (
          <div key={`empty-${i}`}
            className="w-40 h-10 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-700 text-xs font-mono">
            empty
          </div>
        ))}

        {/* Stack items — top to bottom */}
        {[...items].reverse().map((val, i) => {
          const actualIdx = items.length - 1 - i
          const isTop = actualIdx === items.length - 1
          const isHighlighted = activeHighlight === actualIdx
          return (
            <div key={actualIdx}
              className={`w-40 h-10 rounded-lg border-2 flex items-center justify-center font-bold font-mono transition-all duration-300 ${
                isHighlighted
                  ? 'bg-amber-400 border-amber-300 text-gray-900 scale-105 shadow-lg shadow-amber-400/30'
                  : isTop
                  ? 'bg-cyan-600 border-cyan-400 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-200'
              }`}>
              {isTop && <span className="text-xs mr-2 opacity-60">TOP →</span>}
              {val}
            </div>
          )
        })}

        {/* Base */}
        <div className="w-44 h-2 bg-gray-600 rounded-b-lg mt-1" />
      </div>

      <div className="mt-3 text-center text-xs text-gray-500 font-mono">
        size = {items.length} / {capacity}
      </div>
    </div>
  )
}
