import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function FibonacciVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null

  const { dp = [], activeIndex, comparing = [], result } = step

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Fibonacci DP Array</div>
        <div className="text-xs font-mono text-emerald-300">Result: {result ?? '-'}</div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {dp.map((value, idx) => {
            const active = activeIndex === idx
            const dependency = comparing.includes(idx)
            const solved = value !== null

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    scale: active ? 1.08 : 1,
                    backgroundColor: active ? '#f59e0b' : dependency ? '#0e7490' : solved ? '#065f46' : '#1e293b',
                    borderColor: active ? '#fbbf24' : dependency ? '#22d3ee' : solved ? '#10b981' : '#475569',
                  }}
                  transition={{ duration: dur }}
                  className="w-14 h-14 rounded-lg border-2 flex items-center justify-center font-mono font-bold text-white"
                >
                  {value ?? '?'}
                </motion.div>
                <div className="text-[11px] text-gray-500 font-mono">dp[{idx}]</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
        <div className="rounded border border-emerald-800 bg-emerald-900/20 px-3 py-2 text-emerald-300">Solved subproblem</div>
        <div className="rounded border border-cyan-800 bg-cyan-900/20 px-3 py-2 text-cyan-300">Dependency used now</div>
        <div className="rounded border border-amber-800 bg-amber-900/20 px-3 py-2 text-amber-300">Cell being computed</div>
      </div>
    </div>
  )
}
