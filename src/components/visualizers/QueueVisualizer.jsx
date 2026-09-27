export default function QueueVisualizer({ queue, array, highlight, step, capacity }) {
  const items = queue || array || []
  const activeHighlight = highlight ?? step?.highlight ?? -1
  const empty = Math.max(0, capacity - items.length)

  return (
    <div className="panel p-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Queue</div>

      <div className="flex items-center justify-center gap-2 min-h-24 flex-wrap">
        {items.length === 0 ? (
          <div className="text-gray-600 font-mono text-sm">[ empty queue ]</div>
        ) : (
          <>
            <div className="text-xs text-emerald-400 font-mono">FRONT</div>
            <span className="text-gray-600">→</span>

            {items.map((val, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-bold font-mono text-lg transition-all duration-300 ${
                  activeHighlight === idx
                    ? 'bg-amber-400 border-amber-300 text-gray-900 scale-110 shadow-lg shadow-amber-400/30'
                  : idx === 0
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : idx === items.length - 1
                    ? 'bg-cyan-600 border-cyan-400 text-white'
                    : 'bg-slate-700 border-slate-600 text-slate-200'
                }`}>
                  {val}
                </div>
                {idx < items.length - 1 && <span className="text-gray-600 text-lg">→</span>}
              </div>
            ))}

            <span className="text-gray-600">→</span>
            <div className="text-xs text-cyan-400 font-mono">REAR</div>
          </>
        )}
      </div>

      {empty > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          {Array(empty).fill(null).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="w-14 h-10 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-700 text-xs font-mono"
            >
              empty
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-around text-xs font-mono">
        <span><span className="text-gray-500">front: </span><span className="text-emerald-400">{items.length > 0 ? items[0] : 'null'}</span></span>
        <span><span className="text-gray-500">size: </span><span className="text-cyan-400">{items.length} / {capacity}</span></span>
        <span><span className="text-gray-500">rear: </span><span className="text-cyan-400">{items.length > 0 ? items[items.length - 1] : 'null'}</span></span>
      </div>
    </div>
  )
}
