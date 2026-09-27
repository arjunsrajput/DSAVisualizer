export default function LinkedListVisualizer({ nodes, highlight }) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="panel p-5">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Linked List</div>
        <div className="flex items-center justify-center h-32 font-mono text-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-emerald-700 bg-emerald-900/20 px-3 py-2 text-emerald-300">
              HEAD
            </div>
            <span className="text-gray-500">→</span>
            <div className="rounded-lg border border-rose-800 bg-rose-900/20 px-3 py-2 text-rose-300">
              NULL
            </div>
          </div>
        </div>
      </div>
    )
  }

  const normalizedNodes = nodes.map((node, idx) => {
    if (typeof node === 'object' && node !== null) return node
    const nextIndex = idx + 1
    return {
      val: node,
      address: `0x${(0x100 + idx * 0x20).toString(16).toUpperCase()}`,
      nextAddress: nextIndex < nodes.length ? `0x${(0x100 + nextIndex * 0x20).toString(16).toUpperCase()}` : null,
    }
  })
  const headAddress = normalizedNodes[0]?.address
  const isCircular = normalizedNodes.some(node => node.isCircular)

  return (
    <div className="panel p-5 overflow-x-auto">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4">Linked List</div>
      <div className="flex items-center gap-3 min-w-max py-4">
        <div className="flex flex-col items-center gap-1 font-mono">
          <div className="rounded-lg border border-emerald-700 bg-emerald-900/20 px-3 py-2 text-xs font-bold text-emerald-300">
            HEAD
          </div>
          <div className="text-[10px] text-emerald-400">{headAddress}</div>
        </div>
        <span className="text-emerald-500 text-lg">→</span>

        {normalizedNodes.map((node, idx) => (
          <div key={node.address || idx} className="flex items-center gap-2">
            {/* Node */}
            <div className="flex flex-col items-center gap-2">
              <div className={`text-[10px] font-mono transition-colors ${
                highlight === idx
                  ? 'text-amber-300'
                  : idx === 0
                  ? 'text-emerald-300'
                  : 'text-gray-500'
              }`}>
                {node.address}
              </div>
              <div className={`flex rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                highlight === idx
                  ? 'border-amber-400 shadow-lg shadow-amber-400/20'
                  : idx === 0
                  ? 'border-emerald-600'
                  : 'border-slate-600'
              }`}>
                {/* Value part */}
                <div className={`w-16 h-16 flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  highlight === idx
                    ? 'bg-amber-400 text-gray-900'
                    : idx === 0
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}>
                  <span className="text-[10px] uppercase tracking-wider opacity-70">data</span>
                  <span className="text-lg font-bold leading-none">{node.val}</span>
                </div>
                {/* Next pointer part */}
                <div className={`w-20 h-16 flex flex-col items-center justify-center border-l font-mono transition-all duration-300 ${
                  highlight === idx
                    ? 'border-amber-500 bg-amber-900/30 text-amber-200'
                    : 'border-slate-600 bg-gray-800 text-cyan-300'
                }`}>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">next</span>
                  <span className={`text-xs font-bold ${node.nextAddress ? '' : 'text-rose-300'}`}>
                    {node.nextAddress || 'NULL'}
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow from next field or null terminator */}
            {idx < normalizedNodes.length - 1 ? (
              <div className="flex items-center gap-2">
                <span className="text-cyan-500 text-xl">→</span>
              </div>
            ) : isCircular ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-xl">↻</span>
                <span className="rounded-lg border border-amber-800 bg-amber-900/20 px-3 py-2 font-mono text-xs text-amber-300">
                  HEAD
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-rose-500 text-xl">→</span>
                <span className="rounded-lg border border-rose-800 bg-rose-900/20 px-3 py-2 font-mono text-xs text-rose-300">
                  NULL
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
        <span className="rounded border border-gray-800 bg-gray-800/40 px-2 py-1 text-gray-400">
          Node = data field + next pointer field
        </span>
        <span className="rounded border border-emerald-800 bg-emerald-900/20 px-2 py-1 text-emerald-300">
          HEAD stores {headAddress}
        </span>
        {isCircular && (
          <span className="rounded border border-amber-800 bg-amber-900/20 px-2 py-1 text-amber-300">
            Tail next points back to HEAD
          </span>
        )}
      </div>
    </div>
  )
}
