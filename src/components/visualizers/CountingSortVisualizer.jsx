import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function CountingSortVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { array = [], count = [], output = [], activeInput, activeCount, activeOutput, phase } = step
  const maxCount = Math.max(1, ...count)

  return (
    <div className="panel p-4 space-y-4">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Counting Sort</div>

      {/* Input array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">Input Array</div>
        <div className="flex gap-1.5 flex-wrap">
          {array.map((val, i) => (
            <motion.div key={i}
              animate={{ scale: activeInput === i ? 1.2 : 1, backgroundColor: activeInput === i ? '#f59e0b' : '#334155' }}
              transition={{ duration: dur }}
              className="w-10 h-10 rounded-lg border-2 border-slate-600 flex items-center justify-center font-mono font-bold text-sm text-white">
              {val}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Count array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-1">Count Array (index = value)</div>
        <div className="flex gap-1 flex-wrap items-end">
          {count.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-xs font-mono text-gray-400">{c}</span>
              <motion.div
                animate={{
                  height: `${Math.max(8, (c / maxCount) * 48)}px`,
                  backgroundColor: activeCount === i ? '#f59e0b' : c > 0 ? '#0891b2' : '#1e293b',
                }}
                transition={{ duration: dur }}
                className="w-8 rounded-t border border-slate-600"
              />
              <span className="text-[10px] font-mono text-gray-600">{i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Output array */}
      {output.length > 0 && (
        <div>
          <div className="text-xs text-gray-600 font-mono mb-1">Output (sorted)</div>
          <div className="flex gap-1.5 flex-wrap">
            {output.map((val, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, backgroundColor: activeOutput === i ? '#10b981' : '#065f46' }}
                transition={{ duration: dur }}
                className="w-10 h-10 rounded-lg border-2 border-emerald-700 flex items-center justify-center font-mono font-bold text-sm text-white">
                {val}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-600 font-mono capitalize">Phase: {phase}</div>
    </div>
  )
}
