import { motion } from 'framer-motion'
import usePlayerStore from '../../store/usePlayerStore'

export default function NGEVisualizer({ step }) {
  const { speedMs } = usePlayerStore()
  const dur = Math.min(0.35, speedMs / 1500)
  if (!step) return null
  const { array = [], stack = [], result = [], activeIdx, resolvedIdx } = step

  return (
    <div className="panel p-5 space-y-5">
      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono">Next Greater Element (Monotonic Stack)</div>

      {/* Input array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Input Array</div>
        <div className="flex gap-1.5 flex-wrap">
          {array.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <motion.div
                animate={{ scale: activeIdx === i ? 1.2 : resolvedIdx === i ? 1.1 : 1, backgroundColor: activeIdx === i ? '#f59e0b' : resolvedIdx === i ? '#10b981' : '#334155' }}
                transition={{ duration: dur }}
                className="w-11 h-11 rounded-lg border-2 border-slate-600 flex items-center justify-center font-mono font-bold text-white">
                {val}
              </motion.div>
              <span className="text-[10px] text-gray-600 font-mono">[{i}]</span>
            </div>
          ))}
        </div>
      </div>

      {/* Monotonic Stack (shows values) */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Monotonic Stack (indices stored, values shown)</div>
        <div className="flex gap-1.5 items-end flex-wrap min-h-10">
          {stack.map((idx, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: dur }}
              className={`w-11 h-11 rounded-lg border-2 flex flex-col items-center justify-center ${i === stack.length - 1 ? 'bg-cyan-700 border-cyan-500' : 'bg-slate-700 border-slate-600'}`}>
              <span className="text-white font-mono font-bold text-sm">{array[idx]}</span>
              <span className="text-[9px] text-gray-400 font-mono">[{idx}]</span>
            </motion.div>
          ))}
          {stack.length === 0 && <span className="text-gray-600 font-mono text-xs italic">empty</span>}
          <span className="text-xs text-gray-600 font-mono ml-1">← top</span>
        </div>
      </div>

      {/* Result array */}
      <div>
        <div className="text-xs text-gray-600 font-mono mb-2">Result (NGE for each index)</div>
        <div className="flex gap-1.5 flex-wrap">
          {result.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <motion.div
                animate={{ backgroundColor: val !== -1 ? '#065f46' : '#1e293b', scale: resolvedIdx === i ? 1.2 : 1 }}
                transition={{ duration: dur }}
                className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono font-bold ${val !== -1 ? 'border-emerald-600 text-emerald-300' : 'border-slate-700 text-gray-600'}`}>
                {val === -1 ? '-1' : val}
              </motion.div>
              <span className="text-[10px] text-gray-600 font-mono">[{i}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
