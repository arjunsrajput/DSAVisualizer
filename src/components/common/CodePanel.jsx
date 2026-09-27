export default function CodePanel({ code, activeLine, timeComplexity, spaceComplexity, note }) {
  return (
    <div className="panel flex flex-col overflow-hidden h-full">
      {/* Tab header */}
      <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span className="ml-2 text-xs text-gray-500 font-mono">algorithm.js</span>
      </div>

      {/* Code lines */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs">
        {code.map((line, i) => (
          <div key={i}
            className={`flex gap-3 px-2 py-0.5 rounded transition-all duration-200 border-l-2 ${
              activeLine === i
                ? 'bg-cyan-900/50 border-cyan-400 text-cyan-100'
                : 'border-transparent text-gray-500'
            }`}>
            <span className="text-gray-700 select-none w-5 text-right shrink-0">{i + 1}</span>
            <span className={activeLine === i ? 'text-cyan-200' : 'text-gray-400'}>
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Complexity */}
      <div className="border-t border-gray-800 p-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <div className="text-gray-500 text-xs mb-0.5">Time</div>
            <div className="text-amber-400 font-bold font-mono text-sm">{timeComplexity}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-2 text-center">
            <div className="text-gray-500 text-xs mb-0.5">Space</div>
            <div className="text-blue-400 font-bold font-mono text-sm">{spaceComplexity}</div>
          </div>
        </div>
        {note && (
          <div className="bg-amber-900/20 border border-amber-800/40 rounded-lg p-2 text-amber-300/80 text-xs text-center">
            {note}
          </div>
        )}
      </div>
    </div>
  )
}
