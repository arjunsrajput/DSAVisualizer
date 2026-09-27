function getStyle(idx, step, mode) {
  if (!step) return 'bg-slate-700 border-slate-600 text-slate-200'
  if (step.found === idx) return 'bg-emerald-400 border-emerald-300 text-gray-900 scale-110 shadow-lg shadow-emerald-400/30'
  if (step.current === idx) return 'bg-amber-400 border-amber-300 text-gray-900 scale-105 shadow-md shadow-amber-400/20'

  if (mode === 'linear' && step.checked?.includes(idx))
    return 'bg-gray-700 border-gray-600 text-gray-500'

  if (mode === 'binary') {
    const { low, high, mid } = step
    if (low > -1 && (idx < low || idx > high))
      return 'bg-gray-800/50 border-gray-800 text-gray-600'
    if (idx === mid)
      return 'bg-cyan-500 border-cyan-400 text-white scale-105 shadow-md shadow-cyan-500/20'
    return 'bg-slate-600 border-slate-500 text-slate-200'
  }

  return 'bg-slate-700 border-slate-600 text-slate-200'
}

export default function ArrayVisualizer({ array, step, mode = 'linear', target }) {
  if (!array || array.length === 0) return null

  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">Array</span>
        {target !== undefined && (
          <span className="text-xs font-mono">
            <span className="text-gray-500">target = </span>
            <span className="text-cyan-400 font-bold">{target}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {array.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold font-mono text-sm transition-all duration-300 ${getStyle(idx, step, mode)}`}>
              {val}
            </div>
            <span className="text-[10px] text-gray-600 font-mono">{idx}</span>
          </div>
        ))}
      </div>

      {/* Binary search pointers */}
      {mode === 'binary' && step && (
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          {step.low >= 0 && (
            <span className="px-2 py-1 bg-blue-900/40 border border-blue-800 rounded text-blue-300 text-xs font-mono">
              low = {step.low}
            </span>
          )}
          {step.mid >= 0 && (
            <span className="px-2 py-1 bg-cyan-900/40 border border-cyan-800 rounded text-cyan-300 text-xs font-mono">
              mid = {step.mid}
            </span>
          )}
          {step.high >= 0 && (
            <span className="px-2 py-1 bg-rose-900/40 border border-rose-800 rounded text-rose-300 text-xs font-mono">
              high = {step.high}
            </span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {[
          { color: 'bg-amber-400', label: 'Current' },
          { color: 'bg-emerald-400', label: 'Found' },
          ...(mode === 'binary' ? [
            { color: 'bg-cyan-500', label: 'Mid' },
            { color: 'bg-gray-800/50', label: 'Eliminated' },
          ] : [
            { color: 'bg-gray-700', label: 'Checked' },
          ]),
          { color: 'bg-slate-700', label: 'Unvisited' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs">
            <div className={`w-3 h-3 rounded ${l.color} border border-gray-700`} />
            <span className="text-gray-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
