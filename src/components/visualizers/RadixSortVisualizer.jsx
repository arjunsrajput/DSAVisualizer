import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function RadixSortVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.3, speedMs / 1500)
  if (!step) return null
  const { array = [], buckets = [], activeIdx, digit, exp, phase } = step
  const digitName = exp === 1 ? '1s' : exp === 10 ? '10s' : exp === 100 ? '100s' : exp ? `${exp}s` : ''

  return (
    <div className="panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Radix Sort</div>
        {exp > 0 && <div className="text-xs text-cyan-400 font-mono">Sorting by: {digitName} digit</div>}
      </div>

      {/* Main array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">Array</div>
        <div className="flex gap-1.5 flex-wrap">
          {array.map((val, i) => (
            <motion.div key={i}
              animate={{ scale: activeIdx === i ? 1.15 : 1, backgroundColor: activeIdx === i ? '#f59e0b' : '#334155' }}
              transition={{ duration: dur }}
              className="w-12 h-10 rounded-lg border-2 border-slate-600 flex items-center justify-center font-mono font-bold text-sm text-white">
              {val}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buckets 0-9 */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">Buckets (0–9)</div>
        <div className="flex gap-1 flex-wrap">
          {buckets.map((bucket, bi) => (
            <div key={bi} className="flex flex-col items-center min-w-[40px]">
              <div className={`w-10 min-h-10 rounded border-2 flex flex-col gap-0.5 p-0.5 ${bi === digit ? 'border-amber-400 bg-amber-900/20' : 'border-slate-700 bg-slate-800/50'}`}>
                {bucket.map((v, vi) => (
                  <motion.div key={vi}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: dur }}
                    className="w-full h-7 bg-cyan-700 border border-cyan-600 rounded text-xs font-mono font-bold text-white flex items-center justify-center">
                    {v}
                  </motion.div>
                ))}
              </div>
              <span className={`text-[10px] font-mono mt-0.5 ${bi === digit ? 'text-amber-400' : 'text-gray-600'}`}>{bi}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
