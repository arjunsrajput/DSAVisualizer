import usePlayerStore from '../../store/usePlayerStore'

export default function Controls({ playing, onToggle, onPrev, onNext, onReset, isFirst, isLast, stepIdx, totalSteps, progress }) {
  const { speedMs, setSpeedMs } = usePlayerStore()

  return (
    <div className="panel p-4 flex flex-col gap-3">
      {/* Main controls */}
      <div className="flex items-center gap-2">
        <button onClick={onReset} className="btn-ghost px-3" title="Reset (R)">↺</button>
        <button onClick={onPrev} disabled={isFirst} className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed" title="Prev (←)">← Prev</button>
        <button onClick={onToggle}
          className={`flex-1 py-2 rounded-lg font-bold text-sm border transition-all ${
            playing
              ? 'bg-rose-900/40 border-rose-700 text-rose-300'
              : 'bg-cyan-700 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
          }`}>
          {playing ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={onNext} disabled={isLast} className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed" title="Next (→)">Next →</button>
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 w-10 shrink-0">Speed</span>
        <span className="text-xs text-gray-600 font-mono w-8">Slow</span>
        <input
          type="range" min={80} max={1500} step={50}
          value={1580 - speedMs}
          onChange={e => setSpeedMs(1580 - Number(e.target.value))}
          className="flex-1 accent-cyan-500"
        />
        <span className="text-xs text-gray-600 font-mono w-8">Fast</span>
        <span className="text-xs text-cyan-400 font-mono w-14 text-right">{speedMs}ms</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600 font-mono w-16">{stepIdx + 1} / {totalSteps}</span>
        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-600 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="text-center text-xs text-gray-700 font-mono">
        ← → Space R — keyboard shortcuts
      </div>
    </div>
  )
}
